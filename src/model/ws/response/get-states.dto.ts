import { EntityStateDto } from '../common/entity-state.dto.ts'
import { HaWsClientResp } from '../messages.ts'

export interface GetStatesResponseDto extends HaWsClientResp {
  type: 'result'
  result: EntityStateDto[]
  // TODO: which fields upon error?
}
