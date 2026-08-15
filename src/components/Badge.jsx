const TONE_CLASSES = {
  critical: 'bg-status-critical/15 text-status-critical border-status-critical/30',
  high: 'bg-status-high/15 text-status-high border-status-high/30',
  medium: 'bg-status-medium/15 text-status-medium border-status-medium/30',
  low: 'bg-status-low/15 text-status-low border-status-low/30',
  resolved: 'bg-status-resolved/15 text-status-resolved border-status-resolved/30',
  accent: 'bg-accent/15 text-accent border-accent/30',
  neutral: 'bg-white/5 text-ink-muted border-surface-border',
}

function Badge({ label, tone = 'neutral' }) {
  const classes = TONE_CLASSES[tone] || TONE_CLASSES.neutral

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize whitespace-nowrap ${classes}`}
    >
      {label}
    </span>
  )
}

export default Badge
