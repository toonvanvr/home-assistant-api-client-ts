export type Resolve<T> = (value: T) => void
export type Reject = (error: unknown) => void

export interface OpenPromiseOptions {
  timeout?: number | null
  timeoutErrorHandler?: () => unknown
}

export class OpenPromise<T> {
  public readonly resolve: Resolve<T>
  public readonly reject: Reject
  public readonly promise: Promise<T>

  constructor({
    timeout = null,
    timeoutErrorHandler,
  }: OpenPromiseOptions = {}) {
    let res: Resolve<T>
    let rej: Reject
    this.promise = new Promise((resolve: Resolve<T>, reject: Reject) => {
      res = resolve
      rej = reject
    })
    let timeoutId: number | null
    if (timeout !== null) {
      timeoutId = setTimeout(() => {
        if (timeoutErrorHandler) {
          this.reject(timeoutErrorHandler())
        } else {
          this.reject(new Error(`Timeout after ${timeout}ms`))
        }
      }, timeout)
    }
    this.resolve = (value: T) => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      res!(value)
    }
    this.reject = rej!
  }
}

export interface OpenSubscription<T> {
  reject(error: unknown): void
  resolve(value: T): void
  promise: Promise<T>
  next(): Promise<IteratorResult<T>>
  [Symbol.asyncIterator](): AsyncIterableIterator<T>
}
