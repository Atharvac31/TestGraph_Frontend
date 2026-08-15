import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useApi } from '../hooks/useApi.js'
import {
  getRequirement,
  getRequirementTests,
  getRequirementComponents,
  getRequirementServices,
  getRequirementDependencies,
  getRequirementDefects,
} from '../services/requirements.js'
import { unwrapObject } from '../utils/pick.js'
import { priorityBadgeTone, statusBadgeTone } from '../utils/badges.js'
import Badge from '../components/Badge.jsx'
import RelatedSection from '../components/requirement/RelatedSection.jsx'
import ImpactAnalysisTab from '../components/requirement/ImpactAnalysisTab.jsx'
import { ErrorState, EmptyState } from '../components/StateViews.jsx'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'impact', label: 'Impact Analysis' },
]

function DetailSkeleton() {
  return (
    <div className="max-w-4xl space-y-6 animate-pulse">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="rounded-lg border border-surface-border bg-surface-raised/40 p-5 space-y-3">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-6 w-64 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-2/3 rounded bg-white/10" />
      </div>
    </div>
  )
}

function RequirementDetailPage() {
  const { requirementId } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const {
    data: requirementData,
    loading,
    error,
    refetch,
  } = useApi(() => getRequirement(requirementId), [requirementId])

  // Handles both a bare requirement object and one wrapped as { requirement: {...} }
  const requirement = unwrapObject(requirementData, ['requirement'])

  if (loading) return <DetailSkeleton />

  if (error) {
    return (
      <div className="max-w-4xl">
        <ErrorState error={error} onRetry={refetch} />
      </div>
    )
  }

  if (!requirement) {
    return (
      <div className="max-w-4xl">
        <EmptyState
          title="Requirement not found"
          message={`No requirement matches "${requirementId}".`}
        />
      </div>
    )
  }

  return (
    <div className="max-w-4xl space-y-6">
      <Link
        to="/requirements"
        className="inline-flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors"
      >
        ← Back to Requirements
      </Link>

      <div className="rounded-lg border border-surface-border bg-surface-raised/40 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-mono text-xs text-ink-faint">{requirement.id || requirementId}</p>
            <h1 className="mt-1 text-xl font-semibold text-ink">
              {requirement.title || 'Untitled requirement'}
            </h1>
          </div>
          <div className="flex gap-2">
            {requirement.priority && (
              <Badge label={requirement.priority} tone={priorityBadgeTone(requirement.priority)} />
            )}
            {requirement.status && (
              <Badge label={requirement.status} tone={statusBadgeTone(requirement.status)} />
            )}
          </div>
        </div>
        {requirement.description && (
          <p className="mt-4 text-sm text-ink-muted leading-relaxed">
            {requirement.description}
          </p>
        )}
      </div>

      <div className="flex gap-1 border-b border-surface-border">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid gap-4 sm:grid-cols-2">
          <RelatedSection
            title="Test Cases"
            fetcher={() => getRequirementTests(requirementId)}
            deps={[requirementId]}
            listKeys={['tests', 'test_cases']}
          />
          <RelatedSection
            title="Components"
            fetcher={() => getRequirementComponents(requirementId)}
            deps={[requirementId]}
            listKeys={['components']}
          />
          <RelatedSection
            title="Services"
            fetcher={() => getRequirementServices(requirementId)}
            deps={[requirementId]}
            listKeys={['services']}
          />
          <RelatedSection
            title="Dependencies"
            fetcher={() => getRequirementDependencies(requirementId)}
            deps={[requirementId]}
            listKeys={['dependencies']}
            emptyMessage="No dependencies"
          />
          <RelatedSection
            title="Defects"
            fetcher={() => getRequirementDefects(requirementId)}
            deps={[requirementId]}
            listKeys={['defects']}
            emptyMessage="No defects reported"
          />
        </div>
      )}

      {activeTab === 'impact' && (
        <ImpactAnalysisTab requirement={requirement} requirementId={requirementId} />
      )}
    </div>
  )
}

export default RequirementDetailPage
