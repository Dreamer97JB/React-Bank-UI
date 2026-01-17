import { useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { DataTable, type Column } from '../../../components/Table'
import { getCopy } from '../../../lib/i18n'
import { type ReporteMovimiento } from '../../../types/domain'

export function ReportesPage() {
  const [clientId, setClientId] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const data: ReporteMovimiento[] = []
  const copy = getCopy()

  const columns: Array<Column<ReporteMovimiento>> = [
    { key: 'fecha', header: copy.columnDate },
    { key: 'cliente', header: copy.columnClient },
    { key: 'numeroCuenta', header: copy.columnAccount },
    { key: 'tipo', header: copy.columnAccountType },
    {
      key: 'saldoInicial',
      header: copy.columnInitialBalance,
      render: (row) => row.saldoInicial.toFixed(2),
    },
    {
      key: 'estado',
      header: copy.columnStatus,
      render: (row) => (
        <span className={`status ${row.estado ? 'status-active' : 'status-inactive'}`}>
          {row.estado ? copy.statusActive : copy.statusInactive}
        </span>
      ),
    },
    {
      key: 'movimiento',
      header: copy.columnMovement,
      render: (row) => row.movimiento.toFixed(2),
    },
    {
      key: 'saldoDisponible',
      header: copy.columnAvailableBalance,
      render: (row) => row.saldoDisponible.toFixed(2),
    },
  ]

  return (
    <section className="page">
      <header className="page-header page-header-stack">
        <div>
          <h1 className="page-title">{copy.pageReportsTitle}</h1>
          <p className="page-subtitle">
            {copy.reportsSubtitle}
          </p>
        </div>
        <div className="report-actions">
          <Button type="button" variant="primary">
            {copy.reportsGenerate}
          </Button>
          <Button type="button" variant="ghost">
            {copy.reportsDownload}
          </Button>
        </div>
      </header>

      <form className="report-filters" aria-label={copy.reportFiltersLabel}>
        <label className="field">
          <span className="field-label">{copy.reportsClientId}</span>
          <Input
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
            placeholder={copy.reportsClientId}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.reportsStartDate}</span>
          <Input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </label>
        <label className="field">
          <span className="field-label">{copy.reportsEndDate}</span>
          <Input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </label>
      </form>

      <DataTable
        columns={columns}
        data={data}
        getRowKey={(row) => `${row.numeroCuenta}-${row.fecha}`}
        emptyMessage={copy.noReports}
      />
    </section>
  )
}
