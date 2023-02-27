import { HaEvent } from '../ha/event.ts'
import { HaWsClientResp } from './messages.ts'

export interface HaWsEventMessage extends HaWsClientResp {
  type: 'event'
  event: HaEvent
}
