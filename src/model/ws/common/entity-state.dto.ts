export interface EntityStateDto<
  State = string,
  Attributes = Record<string, unknown>
> {
  entity_id: string
  state: State
  attributes: Attributes
  last_changed: string
  last_updated: string
  context: {
    id: string
    parent_id: string
    user_id: string
  }
}
