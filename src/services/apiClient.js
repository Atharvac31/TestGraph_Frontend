const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
/**
 * A normalized error shape for anything that can go wrong talking to the backend.
 * kind: 'network'  -> fetch itself failed (backend down, CORS, wrong URL, offline)
 * kind: 'http'      -> backend responded, but with a non-2xx status (404, 500, etc.)
 */
export class ApiError extends Error {
  constructor(kind, message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.kind = kind
    this.status = status
  }
}

/**
 * Calls the FastAPI backend and returns parsed JSON.
 * Throws ApiError for both network failures and non-2xx responses so every
 * caller can catch one error type instead of juggling fetch's two failure modes.
 */
export async function apiRequest(path, options = {}) {
  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })
  } catch (err) {
    throw new ApiError(
      'network',
      'Could not reach the TestGraph backend. Confirm it is running and VITE_API_BASE_URL is correct.',
    )
  }

  if (!response.ok) {
    let detail = null
    try {
      const body = await response.json()
      detail = body?.detail
    } catch {
      // Response wasn't JSON (e.g. a raw 500 HTML page) — fall back below.
    }

    throw new ApiError(
      'http',
      detail || `Request failed with status ${response.status}`,
      response.status,
    )
  }

  // No content (e.g. 204) — avoid crashing on empty body.
  const text = await response.text()
  return text ? JSON.parse(text) : null
}

export { API_BASE_URL }