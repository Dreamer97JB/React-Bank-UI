import { apiRequest, requestWithFallback } from '../../../lib/apiClient'
import { type Movimiento } from '../../../types/domain'

export function fetchMovimientos() {
  return requestWithFallback<Movimiento[]>('/movimientos', {}, 'movimientos.json')
}

export function createMovimiento(payload: Omit<Movimiento, 'movimientoId' | 'saldo'>) {
  return apiRequest<Movimiento>('/movimientos', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateMovimiento(
  movimientoId: Movimiento['movimientoId'],
  payload: Omit<Movimiento, 'movimientoId' | 'saldo'>
) {
  return apiRequest<Movimiento>(`/movimientos/${movimientoId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteMovimiento(movimientoId: Movimiento['movimientoId']) {
  return apiRequest<void>(`/movimientos/${movimientoId}`, {
    method: 'DELETE',
  })
}
