function SummaryCard({ label, value }) {
  return (
    <div className="rounded-lg border border-surface-border bg-surface-raised/60 px-4 py-4 shadow-card">
      <p className="text-xs uppercase tracking-wide text-ink-faint">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-ink font-mono">
        {value ?? '—'}
      </p>
    </div>
  )
}

export default SummaryCard
