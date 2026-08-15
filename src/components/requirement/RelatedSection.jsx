import { useApi } from '../../hooks/useApi.js'
import { unwrapList } from '../../utils/pick.js'
import { ListSkeleton, ErrorState, EmptyState } from '../StateViews.jsx'
import RelatedItemRow from './RelatedItemRow.jsx'

/**
 * @param {string} title - section heading, e.g. "Test Cases"
 * @param {() => Promise<any>} fetcher - service call, e.g. () => getRequirementTests(id)
 * @param {any[]} deps - re-fetch when these change (typically [requirementId])
 * @param {string[]} listKeys - possible keys the array might be wrapped under,
 *   e.g. ['tests', 'test_cases'], in case the response looks like { count, tests: [...] }
 *   rather than a bare array. Confirmed pattern: GET /api/requirements/ wraps under "requirements".
 * @param {string} emptyMessage - shown when the list resolves empty
 */
function RelatedSection({ title, fetcher, deps, listKeys = [], emptyMessage }) {
  const { data: rawData, loading, error, refetch } = useApi(fetcher, deps)
  const items = unwrapList(rawData, listKeys)

  return (
    <div className="rounded-lg border border-surface-border bg-surface-raised/20 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
        {title}
        {!loading && !error && (
          <span className="rounded-full bg-white/5 px-2 py-0.5 text-xs font-mono text-ink-faint">
            {items.length}
          </span>
        )}
      </h3>

      {loading && <ListSkeleton rows={3} />}

      {!loading && error && <ErrorState message={error.message} onRetry={refetch} />}

      {!loading && !error && items.length === 0 && (
        <EmptyState title={emptyMessage || `No ${title.toLowerCase()} found`} />
      )}

      {!loading && !error && items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, i) => (
            <RelatedItemRow key={item.id ?? i} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default RelatedSection
