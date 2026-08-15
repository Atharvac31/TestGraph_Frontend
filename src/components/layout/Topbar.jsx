import { Link, useLocation } from 'react-router-dom'
import { useHealthStatus } from '../../hooks/useHealthStatus.js'

function useBreadcrumb() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) {
    return [{ label: 'Dashboard', to: '/' }]
  }

  const crumbs = [{ label: 'Dashboard', to: '/' }]
  let acc = ''
  segments.forEach((seg) => {
    acc += `/${seg}`
    const label = seg.match(/^REQ-/i)
      ? seg.toUpperCase()
      : seg.charAt(0).toUpperCase() + seg.slice(1)
    crumbs.push({ label, to: acc })
  })
  return crumbs
}

function ConnectionStatus() {
  const status = useHealthStatus() // 'connected' | 'checking' | 'error'

  const config = {
    connected: { dot: 'bg-status-resolved', text: 'Backend connected', textClass: 'text-ink-muted' },
    checking: { dot: 'bg-status-medium animate-pulse', text: 'Checking…', textClass: 'text-ink-muted' },
    error: { dot: 'bg-status-critical', text: 'Backend unreachable', textClass: 'text-status-critical' },
  }[status]

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-surface-border bg-surface/60 px-2.5 py-1.5 sm:px-3"
      title={config.text}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      <span className={`hidden sm:inline text-xs font-mono ${config.textClass}`}>{config.text}</span>
      <span className="sr-only sm:hidden">{config.text}</span>
    </div>
  )
}

function Topbar({ onMenuClick }) {
  const crumbs = useBreadcrumb()

  return (
    <header className="sticky top-0 z-10 h-16 border-b border-surface-border bg-surface/85 backdrop-blur px-4 md:px-8 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="md:hidden shrink-0 p-2 -ml-2 rounded-md text-ink-muted hover:text-ink hover:bg-white/5"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5">
          <path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm min-w-0 flex-1">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          return (
            <span key={crumb.to} className="flex items-center gap-1.5 min-w-0">
              {i > 0 && <span className="text-ink-faint">/</span>}
              {isLast ? (
                <span className="text-ink font-medium font-mono truncate">{crumb.label}</span>
              ) : (
                <Link to={crumb.to} className="text-ink-muted hover:text-ink transition-colors truncate">
                  {crumb.label}
                </Link>
              )}
            </span>
          )
        })}
      </nav>

      <ConnectionStatus />
    </header>
  )
}

export default Topbar
