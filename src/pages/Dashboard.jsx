import { useApi } from '../hooks/useApi.js'
import { getDashboardSummary } from '../services/dashboardSummary.js'
import { getRequirements } from '../services/requirements.js'
import { pickFirst } from '../utils/pick.js'
import SummaryCard from '../components/SummaryCard.jsx'
import RequirementsTable from '../components/RequirementsTable.jsx'
import { CardsSkeleton, TableSkeleton, ErrorState, EmptyState } from '../components/StateViews.jsx'

function DashboardPage() {
  const {
    data: summary,
    loading: summaryLoading,
    error: summaryError,
    refetch: refetchSummary,
  } = useApi(() => getDashboardSummary())

  const {
    data: requirements,
    loading: requirementsLoading,
    error: requirementsError,
    refetch: refetchRequirements,
  } = useApi(() => getRequirements())

  // Field names are guessed defensively (snake_case, camelCase, "total_*" variants)
  // until the real GET /api/requirements/dashboard/summary response is confirmed.
  const summaryCards = [
    { label: 'Requirements', value: pickFirst(summary, ['requirements', 'requirement_count', 'total_requirements', 'requirementsCount']) },
    { label: 'Test Cases', value: pickFirst(summary, ['test_cases', 'testCases', 'total_test_cases', 'testCaseCount']) },
    { label: 'Components', value: pickFirst(summary, ['components', 'component_count', 'total_components', 'componentsCount']) },
    { label: 'Services', value: pickFirst(summary, ['services', 'service_count', 'total_services', 'servicesCount']) },
    { label: 'Defects', value: pickFirst(summary, ['defects', 'defect_count', 'total_defects', 'defectsCount']) },
  ]

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-xl font-semibold text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-muted">
          A snapshot of the requirement graph. Select any requirement to trace its impact.
        </p>
      </div>

      <section>
        {summaryLoading && <CardsSkeleton count={5} />}

        {!summaryLoading && summaryError && (
          <ErrorState message={summaryError.message} onRetry={refetchSummary} />
        )}

        {!summaryLoading && !summaryError && summary && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {summaryCards.map((card) => (
              <SummaryCard key={card.label} label={card.label} value={card.value} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink uppercase tracking-wide">
          Requirements
        </h2>

        {requirementsLoading && <TableSkeleton rows={6} />}

        {!requirementsLoading && requirementsError && (
          <ErrorState message={requirementsError.message} onRetry={refetchRequirements} />
        )}

        {!requirementsLoading && !requirementsError && requirements && requirements.length === 0 && (
          <EmptyState
            title="No requirements yet"
            message="Seed the database to see requirements here."
          />
        )}

        {!requirementsLoading && !requirementsError && requirements && requirements.length > 0 && (
          <RequirementsTable requirements={requirements} />
        )}
      </section>
    </div>
  )
}

export default DashboardPage