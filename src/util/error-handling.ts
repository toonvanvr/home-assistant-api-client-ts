export function wrapTryReject<
  Reject extends (reason?: any) => void,
  Callback extends (...args: [...U]) => void,
  U extends any[]
>(reject: Reject, callback: Callback) {
  return function (...args: Parameters<Callback>) {
    try {
      callback(...args)
    } catch (error: unknown) {
      reject(error)
    }
  }
}
