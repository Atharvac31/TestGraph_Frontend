import { apiRequest } from './apiClient.js'

/** GET /api/requirements/dashboard/summary — global counts for the dashboard cards */
export function getDashboardSummary() {
  return apiRequest('/api/requirements/dashboard/summary')
}
