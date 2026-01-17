import { requestWithFallback } from '../../../lib/apiClient'
import { type ReporteMovimiento, type ReportesResponse } from '../../../types/domain'

export type ReportFilters = {
  clienteId?: string
  fechaInicio?: string
  fechaFin?: string
}

export async function fetchReportes(filters: ReportFilters = {}) {
  const params = new URLSearchParams()
  if (filters.clienteId) {
    params.set('clienteId', filters.clienteId)
  }
  if (filters.fechaInicio) {
    params.set('fechaInicio', filters.fechaInicio)
  }
  if (filters.fechaFin) {
    params.set('fechaFin', filters.fechaFin)
  }

  const query = params.toString()
  const response = await requestWithFallback<ReportesResponse | ReporteMovimiento[]>(
    query ? `/reportes?${query}` : '/reportes',
    {},
    'reportes.json'
  )

  if (Array.isArray(response)) {
    return { data: response, pdfBase64: null }
  }

  return {
    data: response.data ?? [],
    pdfBase64: response.pdfBase64 ?? null,
  }
}
