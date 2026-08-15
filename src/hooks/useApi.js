import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Runs an async fetcher and tracks its lifecycle.
 *
 * @param {() => Promise<any>} fetcher - an async function, e.g. () => getRequirements()
 * @param {any[]} deps - dependency array; the fetcher re-runs when these change
 *
 * Returns { data, loading, error, refetch }:
 *   - loading: true while the request is in flight
 *   - error: the thrown ApiError, or null
 *   - data: the resolved value, or null until the first successful load
 *   - refetch(): re-runs the fetcher on demand (e.g. a "Try again" button)
 */
export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Guards against setting state after the component unmounts or a newer
  // request has already started (avoids race conditions when deps change fast).
  const requestIdRef = useRef(0)

  const run = useCallback(() => {
    const requestId = ++requestIdRef.current
    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (requestIdRef.current === requestId) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (requestIdRef.current === requestId) {
          setError(err)
          setLoading(false)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run()
  }, [run])

  return { data, loading, error, refetch: run }
}