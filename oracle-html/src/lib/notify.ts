/**
 * notify.ts — client-side replacement for saveError/notifySuccess.
 * Uses the browser's built-in toast/alert mechanism. 
 * Can be swapped for a toast library if desired.
 */

type ToastFn = (msg: string) => void

let _success: ToastFn = (msg) => console.log('[✓]', msg)
let _error: ToastFn = (msg) => console.error('[✗]', msg)

export function registerToastHandlers(onSuccess: ToastFn, onError: ToastFn) {
  _success = onSuccess
  _error = onError
}

export function notifySuccess(msg: string) {
  _success(msg)
}

export function saveError(context: string, err?: unknown) {
  const detail = err instanceof Error ? err.message : String(err ?? '')
  _error(detail ? `${context}: ${detail}` : context)
}
