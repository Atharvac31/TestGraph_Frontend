/**
 * Returns the first defined value found under any of `keys` on `obj`.
 * Useful when a backend response's exact field naming isn't confirmed yet.
 */
export function pickFirst(obj, keys) {
  if (!obj) return undefined
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null) return obj[key]
  }
  return undefined
}

/**
 * Unwraps a list response that may be a bare array, or an object wrapping
 * the array under one of several possible keys (e.g. { count, tests: [...] }
 * — the pattern GET /api/requirements/ uses with its "requirements" key).
 * Falls back to the first array-valued property found on the object.
 */
export function unwrapList(response, keys = []) {
  if (Array.isArray(response)) return response
  if (!response || typeof response !== 'object') return []

  for (const key of keys) {
    if (Array.isArray(response[key])) return response[key]
  }

  const firstArray = Object.values(response).find((v) => Array.isArray(v))
  return firstArray || []
}

/**
 * Unwraps a single-object response that may be wrapped under one of
 * several possible keys (e.g. { requirement: {...} }).
 */
export function unwrapObject(response, keys = []) {
  if (!response || typeof response !== 'object') return response ?? null

  for (const key of keys) {
    if (response[key] && typeof response[key] === 'object' && !Array.isArray(response[key])) {
      return response[key]
    }
  }

  return response
}
