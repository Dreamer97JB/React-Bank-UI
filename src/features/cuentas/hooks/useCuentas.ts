import { useCallback, useEffect, useState } from 'react'
import { fetchCuentas } from '../api/cuentasApi'
import { type Cuenta } from '../../../types/domain'

export type CuentasState = {
  data: Cuenta[]
  isLoading: boolean
  error: string | null
}

export function useCuentas() {
  const [state, setState] = useState<CuentasState>({
    data: [],
    isLoading: true,
    error: null,
  })

  const loadCuentas = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }))

    try {
      const data = await fetchCuentas()
      if (!Array.isArray(data)) {
        throw new Error('Invalid response: expected a list of accounts.')
      }
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      setState({ data: [], isLoading: false, error: message })
    }
  }, [])

  useEffect(() => {
    void loadCuentas()
  }, [loadCuentas])

  return { ...state, reload: loadCuentas }
}
