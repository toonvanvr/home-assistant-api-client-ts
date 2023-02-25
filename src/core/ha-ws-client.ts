import { HaWsClientMsg, HaWsClientResp } from '../model/ws/messages.ts'
import { OpenSubscription } from '../util/async.ts'
import { UsageError } from '../util/error.ts'
import { HaWs } from './ha-ws.ts'

export interface HAWebSocketClientOptions {
  accessToken?: string
  url?: string | URL
}

export class HaWsClient {
  private accessToken: string
  #url!: URL
  ws: Promise<HaWs>

  constructor({
    accessToken = Deno.env.get('HA_ACCESS_TOKEN'),
    url = 'wss://homeassistant.local',
  }: HAWebSocketClientOptions) {
    if (accessToken === undefined) {
      throw new UsageError('No access token provided')
    }

    this.accessToken = accessToken
    this.url = url
    this.ws = this.createWs()
  }

  // TODO: validate
  // TODO: invalidate current WS
  // TODO: throw on unsupported
  set url(url: string | URL) {
    this.#url = new URL(url)
    this.#url.protocol ??= 'wss:'
    this.#url.hostname ??= 'homeassistant.local'
    this.#url.pathname ??= 'api/websocket' // ! this might be too aggressive, not supporting default paths
  }

  get url(): URL {
    return new URL(this.#url)
  }

  // TODO: retry on failure
  private async createWs(): Promise<HaWs> {
    const ws = new HaWs({ accessToken: this.accessToken, url: this.url })
    await ws.authenticated
    return ws
  }

  // TODO: reconnect handling
  public async command<T extends HaWsClientResp>(
    msg: HaWsClientMsg
  ): Promise<T> {
    const ws = await this.ws
    return ws.command<T>(msg)
  }

  // TODO: reconnect handling
  public async subscribe<T extends HaWsClientResp, U extends HaWsClientResp>(
    msg: HaWsClientMsg
  ): Promise<[U, OpenSubscription<T>]> {
    const ws = await this.ws
    return ws.subscribe<T, U>(msg)
  }
}
