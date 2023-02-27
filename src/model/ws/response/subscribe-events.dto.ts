import { EntityStateDto } from '../common/entity-state.dto.ts'
import { HaWsClientResp } from '../messages.ts'

export interface SubscribeStateChangedEventsDto extends HaWsClientResp {
  type: 'event'
  event: {
    event_type: 'state_changed'
    data: {
      entity_id: string
      old_state: EntityStateDto
      new_state: EntityStateDto
      origin: string
      time_fired: string
      context: {
        id: string
        parent_id: string | null
        user_id: string | null
      }
    }
  }
}
