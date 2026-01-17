import { useCallback, useEffect, useState } from 'react'
import { fetchMovimientos } from '../api/movimientosApi'
import { type Movimiento } from '../../../types/domain'

export type MovimientosState = {
  data: Movimiento[]
  isLoading: boolean
  error: string | null
}

export function useMovimientos() {
  const [state, setState] = useState<MovimientosState>({
    data: [],
    isLoading: true,
    error: null,
  })

  const loadMovimientos = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }))

    try {
      const data = await fetchMovimientos()
      if (!Array.isArray(data)) {
        throw new Error('Invalid response: expected a list of movements.')
      }
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      setState({ data: [], isLoading: false, error: message })
    }
  }, [])

  useEffect(() => {
    void loadMovimientos()
  }, [loadMovimientos])

  return { ...state, reload: loadMovimientos }
}
