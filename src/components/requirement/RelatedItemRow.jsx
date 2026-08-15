import Badge from '../Badge.jsx'
import { priorityBadgeTone, statusBadgeTone } from '../../utils/badges.js'
import { pickFirst } from '../../utils/pick.js'

// Covers TestCase, Component, Service, Requirement (dependency), and Defect shapes
// without knowing the exact key names in advance.
function RelatedItemRow({ item }) {
  const id = pickFirst(item, ['id', 'test_id', 'component_id', 'service_id', 'defect_id', 'requirement_id'])
  const title = pickFirst(item, ['title', 'name']) || id || 'Untitled'
  const badgeValue = pickFirst(item, ['severity', 'status', 'priority'])
  const badgeTone = badgeValue
    ? (pickFirst(item, ['severity']) ? priorityBadgeTone(badgeValue) : statusBadgeTone(badgeValue) || priorityBadgeTone(badgeValue))
    : null

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-surface-border bg-surface-raised/40 px-3 py-2.5">
      <div className="min-w-0">
        {id && <p className="font-mono text-xs text-ink-faint">{id}</p>}
        <p className="text-sm text-ink truncate">{title}</p>
      </div>
      {badgeValue && <Badge label={badgeValue} tone={badgeTone} />}
    </div>
  )
}

export default RelatedItemRow
