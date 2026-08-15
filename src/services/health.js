import { apiRequest } from './apiClient.js'

/** GET /health */
export function getHealth() {
  return apiRequest('/health')
}