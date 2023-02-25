import { HaRestClient } from './ha-rest-client.ts'
import { HaWsClient } from './ha-ws-client.ts'

export interface HaApiClientOptions {
  accessToken?: string
  url?: string | URL
}

export class HaApiClient {
  public wsClient: HaWsClient
  public restClient: HaRestClient
  #url!: URL

  constructor({
    accessToken = Deno.env.get('HA_ACCESS_TOKEN'),
    url = 'https://homeassistant.local',
  }: HaApiClientOptions) {
    this.url = url
    this.wsClient = new HaWsClient({
      accessToken: accessToken,
      url: this.wsUrl,
    })
    this.restClient = new HaRestClient()
  }

  // TODO: validate
  // TODO: invalidate current WS
  // TODO: throw on unsupported
  set url(url: string | URL) {
    this.#url = new URL(url)
    this.#url.protocol ??= 'https:'
    this.#url.hostname ??= 'homeassistant.local'
  }

  get url(): URL {
    return new URL(this.#url)
  }

  // TODO: allow overrides
  private get wsUrl(): URL {
    const url = new URL(this.#url)
    url.protocol = url.protocol.replace('http', 'ws')
    url.pathname = [url.pathname, 'api/websocket']
      .filter((v) => v !== '/')
      .join('/')
    return url
  }
}
