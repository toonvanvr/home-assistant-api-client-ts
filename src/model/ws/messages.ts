// Generic (only after auth)

export interface HaWsClientMsg {
  type: string
  [key: string]: unknown
}
export interface HaWsMsg extends HaWsClientMsg {
  id: number
}
export interface HaWsClientResp {
  type: string
  success?: boolean
  [key: string]: unknown
}

export interface HaWsResp extends HaWsClientResp {
  id: number
  ha_version: string
}

// Authentication

interface HaWsInitialMsg {}
export interface HaWsInitialResp {
  type: 'auth_required' | 'auth_ok' | 'auth_invalid'
  ha_version: string
}
export interface HaWsRespAuthRequired extends HaWsInitialResp {
  type: 'auth_required'
}
export interface HaWsRespAuthOk extends HaWsInitialResp {
  type: 'auth_ok'
}
export interface HaWsRespAuthInvalid extends HaWsInitialResp {
  type: 'auth_invalid'
  message: string
}
export interface HaWsMsgAuth extends HaWsInitialMsg {
  type: 'auth'
}
