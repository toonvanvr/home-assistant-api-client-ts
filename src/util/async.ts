export type Resolver = (...args: any[]) => void
export type Rejector = (...args: unknown[]) => void

export interface PromiseHandlers {
  resolve: Resolver
  reject: Rejector
}
