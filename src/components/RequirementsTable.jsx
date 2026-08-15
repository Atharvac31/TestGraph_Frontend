import { useNavigate } from 'react-router-dom'
import Badge from './Badge.jsx'
import { priorityBadgeTone, statusBadgeTone } from '../utils/badges.js'

// NOTE: assumes each requirement object has { id, title, priority, status }.
// If your GET /api/requirements/ response uses different field names,
// this is the only place that needs to change.

function isUrgent(priority) {
  return ['critical', 'high'].includes(String(priority || '').toLowerCase())
}

// Mobile (< sm): a stacked list of cards. Avoids squeezing a 4-column table
// into a narrow viewport with awkward horizontal scrolling.
function RequirementCardList({ requirements, onSelect }) {
  return (
    <div className="space-y-2 sm:hidden">
      {requirements.map((req) => (
        <button
          key={req.id}
          type="button"
          onClick={() => onSelect(req.id)}
          className={`w-full rounded-lg border bg-surface-raised/40 px-4 py-3 text-left transition-colors hover:bg-white/5 ${
            isUrgent(req.priority) ? 'border-l-2 border-l-status-high border-y-surface-border border-r-surface-border' : 'border-surface-border'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-xs text-ink-faint">{req.id}</p>
            <Badge label={req.priority || 'unset'} tone={priorityBadgeTone(req.priority)} />
          </div>
          <p className="mt-1 text-sm font-medium text-ink">{req.title}</p>
          <div className="mt-2">
            <Badge label={req.status || 'unset'} tone={statusBadgeTone(req.status)} />
          </div>
        </button>
      ))}
    </div>
  )
}

// Desktop/tablet (>= sm): a real table.
function RequirementTableRows({ requirements, onSelect }) {
  return (
    <div className="hidden sm:block rounded-lg border border-surface-border bg-surface-raised/40 overflow-x-auto scrollbar-thin">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-border text-left text-xs uppercase tracking-wide text-ink-faint">
            <th className="px-4 py-3 font-medium">ID</th>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req) => (
            <tr
              key={req.id}
              onClick={() => onSelect(req.id)}
              className={`border-b border-surface-border last:border-0 cursor-pointer transition-colors hover:bg-white/5 ${
                isUrgent(req.priority) ? 'border-l-2 border-l-status-high' : ''
              }`}
            >
              <td className="px-4 py-3 font-mono text-ink-muted whitespace-nowrap">
                {req.id}
              </td>
              <td className="px-4 py-3 text-ink">{req.title}</td>
              <td className="px-4 py-3">
                <Badge label={req.priority || 'unset'} tone={priorityBadgeTone(req.priority)} />
              </td>
              <td className="px-4 py-3">
                <Badge label={req.status || 'unset'} tone={statusBadgeTone(req.status)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RequirementsTable({ requirements }) {
  const navigate = useNavigate()
  const onSelect = (id) => navigate(`/requirements/${id}`)

  return (
    <>
      <RequirementCardList requirements={requirements} onSelect={onSelect} />
      <RequirementTableRows requirements={requirements} onSelect={onSelect} />
    </>
  )
}

export default RequirementsTable
