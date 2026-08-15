import { apiRequest } from './apiClient.js'

/** GET /api/requirements/ — full list, used by Dashboard and Requirement Explorer */
export function getRequirements() {
  return apiRequest('/api/requirements/')
}

/** GET /api/requirements/{id} — single requirement's core fields */
export function getRequirement(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}`)
}

/** GET /api/requirements/{id}/tests */
export function getRequirementTests(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/tests`)
}

/** GET /api/requirements/{id}/components */
export function getRequirementComponents(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/components`)
}

/** GET /api/requirements/{id}/services */
export function getRequirementServices(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/services`)
}

/** GET /api/requirements/{id}/defects */
export function getRequirementDefects(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/defects`)
}

/** GET /api/requirements/{id}/dependencies — direct DEPENDS_ON edges */
export function getRequirementDependencies(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/dependencies`)
}

/** GET /api/requirements/{id}/dependency-chain — multi-hop traversal */
export function getRequirementDependencyChain(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/dependency-chain`)
}

/** GET /api/requirements/{id}/impact — the hero endpoint: tests, components, services, defects in one call */
export function getRequirementImpact(requirementId) {
  return apiRequest(`/api/requirements/${requirementId}/impact`)
}