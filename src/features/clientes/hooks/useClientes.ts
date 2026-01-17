import { useCallback, useEffect, useState } from 'react'
import { fetchClientes } from '../api/clientesApi'
import { type Cliente } from '../../../types/domain'

export type ClientesState = {
  data: Cliente[]
  isLoading: boolean
  error: string | null
}

export function useClientes() {
  const [state, setState] = useState<ClientesState>({
    data: [],
    isLoading: true,
    error: null,
  })

  const loadClientes = useCallback(async () => {
    setState((prevState) => ({ ...prevState, isLoading: true, error: null }))

    try {
      const data = await fetchClientes()
      if (!Array.isArray(data)) {
        throw new Error('Invalid response: expected a list of clients.')
      }
      setState({ data, isLoading: false, error: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unexpected error'
      setState({ data: [], isLoading: false, error: message })
    }
  }, [])

  useEffect(() => {
    void loadClientes()
  }, [loadClientes])

  return { ...state, reload: loadClientes }
}
