import { HaAuthToken } from '../model/ha.types.ts'
import {
  MinimalWsMessage,
  MinimalWsResponse,
  WsAuthResp,
  WsMsg,
  WsResp,
  WsResponse,
} from '../model/ws/ws-message.ts'
import { PromiseHandlers } from '../util/async.ts'
import { wrapTryReject } from '../util/error-handling.ts'
import {
  ConnectionError,
  ImpossibleError,
  RuntimeError,
} from '../util/error.ts'

export interface HAWebSocketClientOptions {
  accessToken: HaAuthToken
  url?: string | URL
}

export class HaWsClient {
  private accessToken: HaAuthToken
  public ws: WebSocket | null = null
  private msgCounter = 0
  private readonly responsePromises = new Map<number, PromiseHandlers>() // TODO: WeakMap in case of replacing the WS connection?
  #url!: URL

  private connectedWs: Promise<WebSocket> | null = null

  constructor({
    accessToken,
    url = 'wss://homeassistant.local',
  }: HAWebSocketClientOptions) {
    this.accessToken = accessToken
    this.url = url
  }

  connection(): Promise<WebSocket> {
    return this.connectedWs ?? this.createWebSocket()
  }

  private async createWebSocket(): Promise<WebSocket> {
    // Create the WebSocket inside a promise so we can reject this function from inside callbacks
    this.ws = await new Promise<WebSocket>((resolve, reject) => {
      let ws: WebSocket
      try {
        ws = new WebSocket(this.url)
      } catch (error: unknown) {
        reject(
          new ConnectionError(`Failed to create WS from URL ${this.url}`, {
            cause: error,
          })
        )
        return
      }

      const openWsErrorHandler = wrapTryReject(
        reject,
        this.onWsOpenError.bind(this)
      )

      ws.addEventListener('error', openWsErrorHandler, { once: true })
      // TODO: wrapTryReject
      ws.addEventListener(
        'message',
        wrapTryReject(reject, async ({ data }: MessageEvent) => {
          const msg = HaWsClient.parseReceivedJson(data)
          if (msg.type === 'auth_required') {
            const resp = await this.send<WsAuthResp>(
              {
                type: 'auth',
                access_token: 'something',
              },
              { ws, generateId: false }
            )
            switch (resp.type) {
              case 'auth_invalid':
                throw new RuntimeError(
                  'Invalid authentication credentials sent over WebSocket',
                  { cause: resp }
                )
              case 'auth_ok':
                resolve(ws)
                break
              default:
                throw new ImpossibleError(
                  `Received a WebSocket response with message type other than 'auth_invalid' or 'auth_ok'`
                )
            }
          }
          const responseHandlers = this.responsePromises.get(msg.id)
          // TODO: auth_required doesn't have an ID
          if (!responseHandlers) {
            throw new ImpossibleError(
              `Received WS message for unregistered ID '${msg.id}'`
            )
          }
          responseHandlers.resolve(data)
        })
      ) // TODO: unset? or does it happen automatically upon close
      ws.addEventListener('close', this.onWsClose.bind(this), { once: true })

      ws.addEventListener(
        'open',
        () => {
          ws.removeEventListener('error', openWsErrorHandler)
          ws.addEventListener('error', this.onWsError.bind(this), {
            once: true,
          })
        },
        { once: true }
      )
    })
    return this.ws
  }

  private onWsOpenError(event: Event) {
    throw new ConnectionError(
      `Failed to establish authenticated WebSocket connection to '${this.url}'`,
      { cause: event }
    )
  }
  private onWsError(event: Event) {
    this.ws = null
    this.connectedWs = null
    throw new ConnectionError('Live WebSocket connection error', {
      cause: event,
    })
  }
  private onWsClose(event: CloseEvent) {
    this.ws = null
    this.connectedWs = null
  }

  static parseReceivedJson<T extends MinimalWsResponse = WsResponse>(
    json: string
  ): T {
    let data: T
    try {
      data = JSON.parse(json)
    } catch (error: unknown) {
      throw new ImpossibleError('Received corrupt JSON in WebSocket response', {
        cause: { json, error },
      })
    }
    if (!data.id && data.type !== 'auth_required') {
      throw new ImpossibleError('Received WS message has no ID property', {
        cause: data,
      })
    }
    return data
  }

  public async send<
    Response extends Record<string, any> = WsResp,
    Message extends Record<string, any> = WsMsg
  >(
    data: Message,
    { ws, generateId = true }: { ws?: WebSocket; generateId?: boolean } = {}
  ): Promise<Response & MinimalWsResponse> {
    let json: string
    const id = ++this.msgCounter
    try {
      if (generateId) {
        json = JSON.stringify({ id, ...data } satisfies MinimalWsMessage)
      } else {
        json = JSON.stringify(data satisfies Omit<MinimalWsMessage, 'id'>)
      }
    } catch (error: unknown) {
      this.msgCounter--
      throw new RuntimeError(
        'Trying to send unserializable data through WebSocket',
        { cause: { data, error } }
      )
    }
    ws ??= await this.connection()
    ws.send(json)
    return new Promise((resolve, reject) => {
      this.responsePromises.set(id, { resolve, reject })
    })
  }

  set url(url: string | URL) {
    // TODO: validate
    // TODO: invalidate current WS
    // TODO: throw on unsupported
    this.#url = new URL(url)
    this.#url.protocol ??= 'wss:'
    this.#url.hostname ??= 'homeassistant.local'
    this.#url.pathname ??= 'api/websocket' // ! this might be too aggressive, not supporting default paths
  }

  get url(): URL {
    return new URL(this.#url)
  }
}
