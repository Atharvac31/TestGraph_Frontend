import { useEffect, useRef, useState } from 'react'
import { getHealth } from '../services/health.js'

const POLL_INTERVAL_MS = 15000

/**
 * Returns 'checking' | 'connected' | 'error', backed by a real GET /health
 * call on mount and then every POLL_INTERVAL_MS.
 */
export function useHealthStatus() {
  const [status, setStatus] = useState('checking')
  const timerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    async function check() {
      if (!cancelled) setStatus((prev) => (prev === 'connected' ? prev : 'checking'))
      try {
        await getHealth()
        if (!cancelled) setStatus('connected')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    check()
    timerRef.current = setInterval(check, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(timerRef.current)
    }
  }, [])

  return status
}