/**
 * Maps a requirement's `priority` value to a Badge tone.
 * Unrecognized values fall back to 'neutral' rather than breaking.
 */
export function priorityBadgeTone(priority) {
  const key = String(priority || '').toLowerCase()
  const map = {
    critical: 'critical',
    high: 'high',
    medium: 'medium',
    low: 'low',
  }
  return map[key] || 'neutral'
}

/**
 * Maps a requirement's `status` (or a defect's status) to a Badge tone.
 */
export function statusBadgeTone(status) {
  const key = String(status || '').toLowerCase()
  const map = {
    open: 'critical',
    blocked: 'critical',
    active: 'accent',
    in_progress: 'accent',
    'in progress': 'accent',
    draft: 'neutral',
    resolved: 'resolved',
    closed: 'resolved',
    done: 'resolved',
    deprecated: 'neutral',
  }
  return map[key] || 'neutral'
}
