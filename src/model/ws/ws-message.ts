export interface WsRespAuthRequired {
  type: 'auth_required'
}

export interface WsRespAuthOk {
  type: 'auth_ok'
}

export interface WsRespAuthInvalid {
  type: 'auth_invalid'
  message: string
}

export interface MinimalWsResponse {
  id: number
  type: string
  ha_version: string
}

export type WsResponse = MinimalWsResponse & WsResp
export type WsResp = WsRespAuthRequired | WsRespAuthInvalid | WsRespAuthOk
export type WsAuthResp = WsRespAuthInvalid | WsRespAuthOk

export interface WsMsgAuth {
  type: 'auth'
  access_token: string
}

export interface MinimalWsMessage {
  id: number
  // type: string
}

export type WsMessage = MinimalWsMessage & WsMsg
export type WsMsg = WsMsgAuth
