import { apiRequest } from '../../../lib/apiClient'
import { type Cliente } from '../../../types/domain'

export function fetchClientes() {
  return apiRequest<Cliente[]>('/clientes')
}

export function createCliente(payload: Omit<Cliente, 'clienteId'>) {
  return apiRequest<Cliente>('/clientes', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateCliente(clienteId: Cliente['clienteId'], payload: Omit<Cliente, 'clienteId'>) {
  return apiRequest<Cliente>(`/clientes/${clienteId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteCliente(clienteId: Cliente['clienteId']) {
  return apiRequest<void>(`/clientes/${clienteId}`, {
    method: 'DELETE',
  })
}
