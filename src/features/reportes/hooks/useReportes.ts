import { useCallback, useState } from 'react'
import { fetchReportes, type ReportFilters } from '../api/reportesApi'
import { type ReporteMovimiento } from '../../../types/domain'

export type ReportesState = {
  data: ReporteMovimiento[]
  pdfBase64: string | null
  isLoading: boolean
  error: string | null
}

export function useReportes() {
  const [state, setState] = useState<ReportesState>({
    data: [],
    pdfBase64: null,
    isLoading: false,
    error: null,
  })

  const loadReportes = useCallback(async (filters: ReportFilters = {}) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: null,
    }))

    try {
      const response = await fetchReportes(filters)
      setState({
        data: response.data,
        pdfBase64: response.pdfBase64 ?? null,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      setState({
        data: [],
        pdfBase64: null,
        isLoading: false,
        error: message,
      })
    }
  }, [])

  return { ...state, loadReportes }
}
