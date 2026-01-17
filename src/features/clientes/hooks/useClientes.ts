import { useCallback, useEffect, useState } from 'react'
import { apiBaseUrl, isNetworkError } from '../../../lib/apiClient'
import {
  createCliente as createClienteRequest,
  deleteCliente as deleteClienteRequest,
  fetchClientes,
  updateCliente as updateClienteRequest,
} from '../api/clientesApi'
import { type Cliente } from '../../../types/domain'

export type ClientesState = {
  data: Cliente[]
  isLoading: boolean
  error: string | null
}

export type ClientePayload = Omit<Cliente, 'clienteId'>

export function useClientes() {
  const [state, setState] = useState<ClientesState>({
    data: [],
    isLoading: true,
    error: null,
  })

  const createLocalCliente = useCallback((payload: ClientePayload) => {
    let created: Cliente | null = null

    setState((prevState) => {
      const numericIds = prevState.data
        .map((cliente) => Number(cliente.clienteId))
        .filter((value) => !Number.isNaN(value))
      const nextId = numericIds.length > 0 ? Math.max(...numericIds) + 1 : Date.now()

      created = { ...payload, clienteId: nextId }
      return { ...prevState, data: [...prevState.data, created] }
    })

    return created ?? { ...payload, clienteId: Date.now() }
  }, [])

  const updateLocalCliente = useCallback((clienteId: Cliente['clienteId'], payload: ClientePayload) => {
    let updated: Cliente | null = null

    setState((prevState) => {
      const data = prevState.data.map((cliente) => {
        if (cliente.clienteId !== clienteId) {
          return cliente
        }
        updated = { ...cliente, ...payload, clienteId }
        return updated
      })

      if (!updated) {
        updated = { ...payload, clienteId }
        data.push(updated)
      }

      return { ...prevState, data }
    })

    return updated ?? { ...payload, clienteId }
  }, [])

  const deleteLocalCliente = useCallback((clienteId: Cliente['clienteId']) => {
    setState((prevState) => ({
      ...prevState,
      data: prevState.data.filter((cliente) => cliente.clienteId !== clienteId),
    }))
  }, [])

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

  const createCliente = useCallback(
    async (payload: ClientePayload) => {
      if (!apiBaseUrl) {
        return createLocalCliente(payload)
      }

      try {
        const created = await createClienteRequest(payload)
        setState((prevState) => ({
          ...prevState,
          data: [...prevState.data, created],
        }))
        return created
      } catch (error) {
        if (isNetworkError(error)) {
          return createLocalCliente(payload)
        }
        throw error
      }
    },
    [createLocalCliente]
  )

  const updateCliente = useCallback(
    async (clienteId: Cliente['clienteId'], payload: ClientePayload) => {
      if (!apiBaseUrl) {
        return updateLocalCliente(clienteId, payload)
      }

      try {
        const updated = await updateClienteRequest(clienteId, payload)
        setState((prevState) => ({
          ...prevState,
          data: prevState.data.map((cliente) =>
            cliente.clienteId === clienteId ? updated : cliente
          ),
        }))
        return updated
      } catch (error) {
        if (isNetworkError(error)) {
          return updateLocalCliente(clienteId, payload)
        }
        throw error
      }
    },
    [updateLocalCliente]
  )

  const deleteCliente = useCallback(
    async (clienteId: Cliente['clienteId']) => {
      if (!apiBaseUrl) {
        deleteLocalCliente(clienteId)
        return
      }

      try {
        await deleteClienteRequest(clienteId)
        deleteLocalCliente(clienteId)
      } catch (error) {
        if (isNetworkError(error)) {
          deleteLocalCliente(clienteId)
          return
        }
        throw error
      }
    },
    [deleteLocalCliente]
  )

  return {
    ...state,
    reload: loadClientes,
    createCliente,
    updateCliente,
    deleteCliente,
  }
}
