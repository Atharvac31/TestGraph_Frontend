import { useApi } from '../hooks/useApi.js'
import { getRequirements } from '../services/requirements.js'
import RequirementsTable from '../components/RequirementsTable.jsx'
import SummaryCard from '../components/SummaryCard.jsx'
import { TableSkeleton, ErrorState, EmptyState } from '../components/StateViews.jsx'

function RequirementsListPage() {
  const { data, loading, error, refetch } = useApi(() => getRequirements())

  // GET /api/requirements/ returns { count, requirements: [...] }
  const requirements = data?.requirements ?? []

  const highPriorityCount = requirements.filter(
    (req) => req.priority?.toLowerCase() === 'high',
  ).length

  const implementedCount = requirements.filter(
    (req) => req.status?.toLowerCase() === 'implemented',
  ).length

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-ink">Requirements</h1>
        <p className="mt-1 text-sm text-ink-muted">
          Browse every requirement in the graph. Select one to trace its tests, components, and impact.
        </p>
      </div>

      {!loading && !error && data && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SummaryCard label="Total Requirements" value={data.count ?? requirements.length} />
          <SummaryCard label="High Priority" value={highPriorityCount} />
          <SummaryCard label="Implemented" value={implementedCount} />
        </div>
      )}

      <section>
        {loading && <TableSkeleton rows={8} />}

        {!loading && error && (
          <ErrorState error={error} onRetry={refetch} />
        )}

        {!loading && !error && requirements.length === 0 && (
          <EmptyState
            title="No requirements yet"
            message="Upload and process a requirement document to generate requirements."
          />
        )}

        {!loading && !error && requirements.length > 0 && (
          <RequirementsTable requirements={requirements} />
        )}
      </section>
    </div>
  )
}

export default RequirementsListPage
