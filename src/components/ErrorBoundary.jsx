import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('TestGraph crashed:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center bg-surface px-4">
        <div className="max-w-md text-center">
          <p className="text-xs font-mono uppercase tracking-widest text-status-critical">
            Application error
          </p>
          <h1 className="mt-2 text-xl font-semibold text-ink">Something broke</h1>
          <p className="mt-2 text-sm text-ink-muted">
            TestGraph hit an unexpected error rendering this page. Reloading usually fixes it.
          </p>
          {this.state.error?.message && (
            <p className="mt-3 rounded-md border border-surface-border bg-surface-raised/40 px-3 py-2 text-left text-xs font-mono text-ink-faint break-words">
              {this.state.error.message}
            </p>
          )}
          <div className="mt-5 flex justify-center gap-3">
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-md border border-surface-border px-4 py-2 text-sm font-medium text-ink hover:bg-white/5 transition-colors"
            >
              Try again
            </button>
            <button
              type="button"
              onClick={() => window.location.assign('/')}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
