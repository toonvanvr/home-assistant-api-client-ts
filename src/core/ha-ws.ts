import {
  HaWsClientMsg,
  HaWsClientResp,
  HaWsInitialResp,
  HaWsResp,
} from '../model/ws/messages.ts'
import { OpenPromise, OpenSubscription } from '../util/async.ts'
import { ConnectionError } from '../util/error.ts'

export interface HaWsOptions {
  accessToken: string
  url: URL
  timeout?: number
}

export class HaWs {
  private readonly ws: WebSocket
  private readonly responses = new Map<
    number,
    OpenPromise<HaWsClientResp> | OpenSubscription<HaWsClientResp>
  >()

  #opened = new OpenPromise<Event>()
  #authenticated = new OpenPromise<void>()
  private msgCount = 0
  public timeout: number | null

  constructor({ accessToken, url, timeout }: HaWsOptions) {
    this.timeout = timeout ?? null
    this.ws = new WebSocket(url)
    this.registerListeners()
    this.authenticate(accessToken)
  }

  private async authenticate(accessToken: string): Promise<void> {
    await this.opened
    this.ws.send(JSON.stringify({ type: 'auth', access_token: accessToken }))
    return this.authenticated
  }

  private registerListeners() {
    this.ws.addEventListener('open', this.onOpen.bind(this))
    this.ws.addEventListener('close', this.onClose.bind(this))
    this.ws.addEventListener('message', this.onMessage.bind(this))
    this.ws.addEventListener('error', this.onError.bind(this))
  }

  private onOpen(event: Event) {
    this.#opened.resolve(event)
  }

  private onClose(event: CloseEvent) {
    for (const { reject } of this.responses.values()) {
      reject(
        new ConnectionError(
          `WebSocket connection closed unexpectedly with code ${event.code}`,
          { cause: event }
        )
      )
    }
    this.#opened.reject(event)
    this.#authenticated.reject(event)
  }

  private onError(error: unknown) {
    for (const { reject } of this.responses.values()) {
      reject(error)
    }
    this.#opened.reject(error)
    this.#authenticated.reject(error)
  }

  private onMessage({ data }: MessageEvent) {
    const msg: HaWsInitialResp | HaWsResp = JSON.parse(data)
    switch (msg.type) {
      case 'auth_required':
        break
      case 'auth_ok':
        this.#authenticated.resolve()
        break
      case 'auth_invalid':
        this.#authenticated.reject(msg)
        break
      default:
        this.handleMessage(msg as HaWsResp)
    }
  }

  public async command<T extends HaWsClientResp>(
    msg: HaWsClientMsg
  ): Promise<T> {
    await this.authenticated
    const id = ++this.msgCount
    const payload = { ...msg, id }
    console.log('>', payload)
    this.ws.send(JSON.stringify(payload))
    const promise = new OpenPromise<HaWsClientResp>({ timeout: this.timeout })
    this.responses.set(id, promise)
    promise.promise.then(() => this.responses.delete(id))
    const response = await (promise.promise as Promise<T>)
    console.log('<', response)
    return response
  }

  // ! FIXME: (critical) if the promised value is fetched with a delay,
  // !        another message may have come in first, which would be tossed
  public async subscribe<T extends HaWsClientResp, U extends HaWsClientResp>(
    msg: HaWsClientMsg
  ): Promise<[U, OpenSubscription<T>]> {
    const { promise, resolve, reject } = new OpenPromise<HaWsClientResp>()
    const subscription = {
      promise,
      resolve,
      reject,
      async next() {
        const msg = await this.promise
        const { promise, resolve, reject } = new OpenPromise<HaWsClientResp>()
        this.promise = promise
        this.resolve = resolve
        this.reject = reject
        return { done: false, value: msg }
      },
      [Symbol.asyncIterator]() {
        return this
      },
    }
    try {
      await this.authenticated
      const id = ++this.msgCount
      this.responses.set(id, subscription)
      this.ws.send(JSON.stringify({ ...msg, id }))
    } catch (error) {
      subscription.reject(error)
    }
    const resp = (await promise) as U
    if (resp.success === true) {
      const nextPromise = new OpenPromise<HaWsClientResp>()
      subscription.promise = nextPromise.promise
      subscription.resolve = nextPromise.resolve
      subscription.reject = nextPromise.reject
      return [resp, subscription as unknown as OpenSubscription<T>]
    } else {
      throw resp
    }
  }

  get opened(): Promise<Event> {
    return this.#opened.promise
  }

  get authenticated(): Promise<void> {
    return this.#authenticated.promise
  }

  private handleMessage({ id, ...msg }: HaWsResp): void {
    this.responses.get(id)?.resolve(msg)
    // TODO: error if id is not found?
  }
}
