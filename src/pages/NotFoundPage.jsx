import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <p className="text-xs font-mono text-ink-faint uppercase tracking-widest">404</p>
      <h1 className="mt-2 text-xl font-semibold text-ink">Page not found</h1>
      <p className="mt-1 text-sm text-ink-muted">
        There's no node at this path.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage