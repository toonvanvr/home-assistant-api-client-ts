import { HaAuthToken } from '../model/ha.types.ts'
import { HaRestClient } from './ha-rest-client.ts'
import { HaWsClient } from './ha-ws-client.ts'

export interface HaApiClientOptions {
  accessToken: HaAuthToken
  url: string | URL
}

export class HaApiClient {
  public ws: HaWsClient
  public rest: HaRestClient
  #url!: URL

  constructor({ accessToken, url }: HaApiClientOptions) {
    this.url = url
    this.ws = new HaWsClient({ accessToken: accessToken, url: this.wsUrl })
    this.rest = new HaRestClient()
  }

  set url(url: string | URL) {
    // TODO: validate
    // TODO: invalidate current WS
    // TODO: throw on unsupported
    this.#url = new URL(url)
    this.#url.protocol ??= 'https:'
    this.#url.hostname ??= 'homeassistant.local'
  }

  get url(): URL {
    return new URL(this.#url)
  }

  private get wsUrl(): URL {
    const url = new URL(this.#url)
    url.protocol = url.protocol.replace('http', 'ws')
    url.pathname = [url.pathname, 'api/websocket']
      .filter((v) => v !== '/')
      .join('/')
    return url
  }
}
