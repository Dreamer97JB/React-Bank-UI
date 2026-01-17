import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout'
import { ClientesPage } from '../features/clientes/pages/ClientesPage'
import { CuentasPage } from '../features/cuentas/pages/CuentasPage'
import { MovimientosPage } from '../features/movimientos/pages/MovimientosPage'
import { ReportesPage } from '../features/reportes/pages/ReportesPage'

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/clientes" replace />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/cuentas" element={<CuentasPage />} />
        <Route path="/movimientos" element={<MovimientosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
      </Route>
    </Routes>
  )
}
