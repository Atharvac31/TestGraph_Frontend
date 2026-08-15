function FlowConnector() {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-5 w-px bg-surface-border" />
      <svg viewBox="0 0 10 6" className="h-1.5 w-2.5 text-surface-border" fill="currentColor">
        <path d="M0 0 L10 0 L5 6 Z" />
      </svg>
    </div>
  )
}

const NODE_TONE = {
  requirement: 'border-accent/40 bg-accent/10 text-ink',
  test: 'border-accent/25 bg-accent/5 text-ink',
  component: 'border-surface-border bg-surface-raised/60 text-ink',
  service: 'border-surface-border bg-surface-raised/60 text-ink',
  defect: 'border-status-critical/40 bg-status-critical/10 text-status-critical',
}

function ImpactNode({ kind, id, label }) {
  return (
    <div className={`min-w-[9rem] max-w-[14rem] rounded-md border px-3 py-2 text-left ${NODE_TONE[kind]}`}>
      {id && <p className="font-mono text-[11px] opacity-70">{id}</p>}
      <p className="truncate text-sm font-medium">{label || id || 'Untitled'}</p>
    </div>
  )
}

function NodeRow({ items, kind, getId, getLabel, emptyLabel }) {
  if (!items.length) {
    return <p className="text-center text-sm italic text-ink-faint">{emptyLabel}</p>
  }
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((item, i) => (
        <ImpactNode key={getId(item) ?? i} kind={kind} id={getId(item)} label={getLabel(item)} />
      ))}
    </div>
  )
}

// NOTE: this renders an aggregate view (all tests -> all components/defects -> all services)
// rather than precise per-test edges, since the /impact response returns flat lists.
// If the backend later returns per-test nesting, this can be upgraded to a true per-edge tree.
function ImpactFlow({ requirement, testCases, components, services, defects }) {
  const testId = (t) => t.id ?? t.test_id
  const testLabel = (t) => t.title ?? t.name
  const compId = (c) => c.id ?? c.component_id
  const compLabel = (c) => c.title ?? c.name
  const svcId = (s) => s.id ?? s.service_id
  const svcLabel = (s) => s.title ?? s.name
  const defId = (d) => d.id ?? d.defect_id
  const defLabel = (d) => d.title ?? d.name

  return (
    <div className="rounded-lg border border-surface-border bg-surface-raised/20 p-6">
      <div className="flex flex-col items-center">
        <ImpactNode kind="requirement" id={requirement?.id} label={requirement?.title} />

        <FlowConnector />

        <div className="w-full">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">
            Validated By
          </p>
          <NodeRow
            items={testCases}
            kind="test"
            getId={testId}
            getLabel={testLabel}
            emptyLabel="No test cases"
          />
        </div>

        <FlowConnector />

        <div className="grid w-full gap-6 md:grid-cols-2">
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Tests Component
            </p>
            <NodeRow
              items={components}
              kind="component"
              getId={compId}
              getLabel={compLabel}
              emptyLabel="No components"
            />
          </div>
          <div>
            <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">
              Caught
            </p>
            <NodeRow
              items={defects}
              kind="defect"
              getId={defId}
              getLabel={defLabel}
              emptyLabel="No defects"
            />
          </div>
        </div>

        {services.length > 0 && (
          <>
            <FlowConnector />
            <div className="w-full">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-faint">
                Part Of
              </p>
              <NodeRow
                items={services}
                kind="service"
                getId={svcId}
                getLabel={svcLabel}
                emptyLabel="No services"
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ImpactFlow
