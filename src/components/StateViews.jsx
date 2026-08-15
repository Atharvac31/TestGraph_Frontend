function ListSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-md border border-surface-border bg-surface-raised/40 px-3 py-2.5 animate-pulse"
        >
          <div className="h-3 w-14 rounded bg-white/10" />
          <div className="h-3 flex-1 rounded bg-white/10" />
        </div>
      ))}
    </div>
  )
}

function CardsSkeleton({ count = 5 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-surface-border bg-surface-raised/40 px-4 py-4 animate-pulse"
        >
          <div className="h-3 w-16 rounded bg-white/10" />
          <div className="mt-3 h-6 w-10 rounded bg-white/10" />
        </div>
      ))}
    </div>
  )
}

function TableSkeleton({ rows = 5 }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-raised/40 overflow-hidden">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 px-4 py-3 border-b border-surface-border last:border-0 animate-pulse"
        >
          <div className="h-3 w-16 rounded bg-white/10" />
          <div className="h-3 flex-1 rounded bg-white/10" />
          <div className="h-3 w-14 rounded bg-white/10" />
          <div className="h-3 w-14 rounded bg-white/10" />
        </div>
      ))}
    </div>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-status-critical" aria-hidden="true">
      <path
        d="M12 9v4M12 16.5h.01M10.29 3.86l-8.18 14.18A1.5 1.5 0 0 0 3.38 20.5h17.24a1.5 1.5 0 0 0 1.27-2.46L13.71 3.86a1.5 1.5 0 0 0-2.42 0Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-status-critical" aria-hidden="true">
      <path
        d="M9 3v4M15 3v4M7 7h10l-.6 5.4a4.5 4.5 0 0 1-4.47 4M11.93 16.4V21M4 4l16 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function InboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-ink-faint" aria-hidden="true">
      <path
        d="M3.5 12h4.2l1.3 3h5.8l1.4-3h4.3M3.5 12 5.4 4.9A1.5 1.5 0 0 1 6.85 3.75h10.3a1.5 1.5 0 0 1 1.45 1.15L20.5 12M3.5 12v6a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/**
 * @param {Error|{message?: string, kind?: 'network'|'http'}} error - typically an ApiError
 * @param {() => void} onRetry
 */
function ErrorState({ message, error, onRetry }) {
  const kind = error?.kind
  const isNetwork = kind === 'network'

  const heading = isNetwork ? 'Backend unreachable' : 'Something went wrong'
  const body =
    message ||
    error?.message ||
    (isNetwork
      ? 'Could not reach the TestGraph backend. Confirm the FastAPI server is running.'
      : 'Could not load data from the backend.')

  return (
    <div className="rounded-lg border border-status-critical/30 bg-status-critical/5 px-5 py-8 text-center">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-status-critical/10">
        {isNetwork ? <PlugIcon /> : <WarningIcon />}
      </div>
      <p className="mt-3 text-sm font-medium text-status-critical">{heading}</p>
      <p className="mt-1 text-sm text-ink-muted">{body}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center rounded-md border border-surface-border px-3 py-1.5 text-xs font-medium text-ink hover:bg-white/5 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  )
}

function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-surface-border px-5 py-10 text-center">
      <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white/5">
        <InboxIcon />
      </div>
      <p className="mt-3 text-sm font-medium text-ink">{title}</p>
      {message && <p className="mt-1 text-sm text-ink-muted">{message}</p>}
    </div>
  )
}

export { CardsSkeleton, TableSkeleton, ListSkeleton, ErrorState, EmptyState }
