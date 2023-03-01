import { BehaviorSubject, Observable } from 'npm:rxjs'
import { switchMap } from 'npm:rxjs/operators'
import { EntityStateDto } from '../model/ws/common/entity-state.dto.ts'
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

  readonly states$ = new Observable<
    Map<string, BehaviorSubject<EntityStateDto | null>>
  >((subscriber) => {
    !(async () => {
      const states = new Map<string, BehaviorSubject<EntityStateDto | null>>()
      const events = await this.wsClient.subscribeStateChangedEvents()
      const initialStatesDto = await this.wsClient.getStates()
      for (const state of initialStatesDto) {
        states.set(
          state.entity_id,
          new BehaviorSubject<EntityStateDto | null>(state)
        )
      }
      subscriber.next(states)
      for await (const event of events) {
        const state = event.event.data.new_state
        // TODO: compare timestamps and only emit if newer
        // TODO: handle entity renames
        const subject = states.get(state.entity_id)
        if (subject) {
          subject.next(state)
        } else {
          states.set(
            state.entity_id,
            new BehaviorSubject<EntityStateDto | null>(state)
          )
        }
      }
    })()
  })

  state$<State = EntityStateDto>(entityId: string): Observable<State | null> {
    return this.states$.pipe(
      switchMap((states) => {
        const state = states.get(entityId) as
          | BehaviorSubject<State | null>
          | undefined
        if (!state) {
          const subject = new BehaviorSubject<State | null>(null)
          states.set(
            entityId,
            subject as BehaviorSubject<EntityStateDto | null>
          )
          return subject.asObservable()
        } else {
          return state
        }
      })
    )
  }
}
