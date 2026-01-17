import { useMemo, useState } from 'react'
import { PageHeader } from '../../../components/PageHeader'
import { DataTable, type Column } from '../../../components/Table'
import { getCopy } from '../../../lib/i18n'
import { type Movimiento } from '../../../types/domain'
import { useMovimientos } from '../hooks/useMovimientos'

export function MovimientosPage() {
  const [query, setQuery] = useState('')
  const { data, isLoading, error } = useMovimientos()
  const copy = getCopy()

  const columns: Array<Column<Movimiento>> = [
    { key: 'fecha', header: copy.columnDate },
    { key: 'tipoMovimiento', header: copy.columnType },
    {
      key: 'valor',
      header: copy.columnValue,
      render: (row) => row.valor.toFixed(2),
    },
    {
      key: 'saldo',
      header: copy.columnBalance,
      render: (row) => row.saldo.toFixed(2),
    },
    { key: 'numeroCuenta', header: copy.columnAccount },
  ]

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return data
    }

    return data.filter((movimiento) => {
      const haystack = [
        movimiento.fecha,
        movimiento.tipoMovimiento,
        movimiento.numeroCuenta,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [data, query])

  return (
    <section className="page">
      <PageHeader
        title={copy.pageMovementsTitle}
        searchValue={query}
        searchPlaceholder={copy.searchMovementsPlaceholder}
        searchAriaLabel={copy.searchMovementsPlaceholder}
        onSearchChange={setQuery}
        actionLabel={copy.actionNew}
        onAction={() => {}}
      />
      {error ? <div className="alert">{error}</div> : null}
      <DataTable
        columns={columns}
        data={filtered}
        getRowKey={(row) => String(row.movimientoId)}
        emptyMessage={
          isLoading ? copy.loadingMovements : error ? copy.errorMovements : copy.noMovements
        }
      />
    </section>
  )
}
