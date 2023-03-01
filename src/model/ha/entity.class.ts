import { Observable } from 'npm:rxjs'
import { HaApiClient } from '../../core/ha-api-client.ts'
import { EntityStateDto } from '../ws/common/entity-state.dto.ts'

export interface EntityOptions {
  ha: HaApiClient
  entityId: string
}

export abstract class Entity<State = EntityStateDto> {
  protected ha: HaApiClient
  protected entityId: string

  public readonly state$: Observable<State | null>

  constructor({ ha, entityId }: EntityOptions) {
    this.ha = ha
    this.entityId = entityId
    this.state$ = this.ha.state$(this.entityId)
  }

  protected callService(domain: string, service: string, data: any) {
    return this.ha.wsClient.callService(domain, service, {
      data,
      entityId: this.entityId,
    })
  }
}
