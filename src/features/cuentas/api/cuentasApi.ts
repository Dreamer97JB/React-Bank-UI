import { apiRequest, requestWithFallback } from '../../../lib/apiClient'
import { type Cuenta } from '../../../types/domain'

export function fetchCuentas() {
  return requestWithFallback<Cuenta[]>('/cuentas', {}, 'cuentas.json')
}

export function createCuenta(payload: Omit<Cuenta, 'numeroCuenta'>) {
  return apiRequest<Cuenta>('/cuentas', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function updateCuenta(numeroCuenta: Cuenta['numeroCuenta'], payload: Omit<Cuenta, 'numeroCuenta'>) {
  return apiRequest<Cuenta>(`/cuentas/${numeroCuenta}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export function deleteCuenta(numeroCuenta: Cuenta['numeroCuenta']) {
  return apiRequest<void>(`/cuentas/${numeroCuenta}`, {
    method: 'DELETE',
  })
}
