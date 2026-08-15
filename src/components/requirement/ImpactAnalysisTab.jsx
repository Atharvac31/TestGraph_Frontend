import { useApi } from '../../hooks/useApi.js'
import { getRequirementImpact } from '../../services/requirements.js'
import { unwrapObject, unwrapList } from '../../utils/pick.js'
import { ListSkeleton, ErrorState, EmptyState } from '../StateViews.jsx'
import SummaryCard from '../SummaryCard.jsx'
import ImpactFlow from './ImpactFlow.jsx'

function mergeById(...lists) {
  const map = new Map()
  lists.flat().forEach((item) => {
    if (!item) return
    const key = item.id ?? item.name ?? JSON.stringify(item)
    if (!map.has(key)) map.set(key, item)
  })
  return Array.from(map.values())
}

function ImpactAnalysisTab({ requirement, requirementId }) {
  const {
    data: rawImpact,
    loading,
    error,
    refetch,
  } = useApi(() => getRequirementImpact(requirementId), [requirementId])

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ListSkeleton key={i} rows={2} />
        ))}
      </div>
    )
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={refetch} />
  }

  const impact = unwrapObject(rawImpact, ['impact', 'data']) || {}

  const testCases = unwrapList(impact, ['test_cases', 'tests', 'testCases'])
  const services = unwrapList(impact, ['services'])
  const defects = unwrapList(impact, ['defects'])
  const components = mergeById(
    Array.isArray(impact.components) ? impact.components : [],
    Array.isArray(impact.affected_components) ? impact.affected_components : [],
  )

  const hasAnyImpact =
    testCases.length || components.length || services.length || defects.length

  if (!hasAnyImpact) {
    return (
      <EmptyState
        title="No impact data"
        message="This requirement isn't linked to any test cases, components, or defects yet."
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryCard label="Test Cases" value={testCases.length} />
        <SummaryCard label="Components" value={components.length} />
        <SummaryCard label="Services" value={services.length} />
        <SummaryCard label="Defects" value={defects.length} />
      </div>

      <ImpactFlow
        requirement={requirement}
        testCases={testCases}
        components={components}
        services={services}
        defects={defects}
      />
    </div>
  )
}

export default ImpactAnalysisTab
