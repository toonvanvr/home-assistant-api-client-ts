import { EntityStateDto } from '../ws/common/entity-state.dto.ts'

export interface HaEvent {
  event_type: 'state_changed'
  data: {
    entity_id: string
    old_state: EntityStateDto
    new_state: EntityStateDto
  }
}
