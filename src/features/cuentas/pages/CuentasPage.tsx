import { useMemo, useState } from 'react'
import { PageHeader } from '../../../components/PageHeader'
import { DataTable, type Column } from '../../../components/Table'
import { getCopy } from '../../../lib/i18n'
import { type Cuenta } from '../../../types/domain'

export function CuentasPage() {
  const [query, setQuery] = useState('')
  const data: Cuenta[] = []
  const copy = getCopy()

  const columns: Array<Column<Cuenta>> = [
    { key: 'numeroCuenta', header: copy.columnAccountNumber },
    { key: 'tipoCuenta', header: copy.columnAccountType },
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
    { key: 'clienteId', header: copy.columnClient },
  ]

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return data
    }

    return data.filter((cuenta) => {
      const haystack = [
        cuenta.numeroCuenta,
        cuenta.tipoCuenta,
        cuenta.clienteId,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [data, query])

  return (
    <section className="page">
      <PageHeader
        title={copy.pageAccountsTitle}
        searchValue={query}
        searchPlaceholder={copy.searchAccountsPlaceholder}
        searchAriaLabel={copy.searchAccountsPlaceholder}
        onSearchChange={setQuery}
        actionLabel={copy.actionNew}
        onAction={() => {}}
      />
      <DataTable
        columns={columns}
        data={filtered}
        getRowKey={(row) => String(row.numeroCuenta)}
        emptyMessage={copy.noAccounts}
      />
    </section>
  )
}
