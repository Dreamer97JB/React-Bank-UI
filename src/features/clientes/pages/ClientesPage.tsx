import { useMemo, useState } from 'react'
import { Button } from '../../../components/Button'
import { PageHeader } from '../../../components/PageHeader'
import { DataTable, type Column } from '../../../components/Table'
import { getCopy } from '../../../lib/i18n'
import { type Cliente } from '../../../types/domain'
import { useClientes } from '../hooks/useClientes'

export function ClientesPage() {
  const { data, isLoading, error } = useClientes()
  const [query, setQuery] = useState('')
  const copy = getCopy()

  const columns: Array<Column<Cliente>> = [
    { key: 'nombre', header: copy.columnName },
    { key: 'identificacion', header: copy.columnIdentification },
    { key: 'telefono', header: copy.columnPhone },
    { key: 'direccion', header: copy.columnAddress },
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
      key: 'actions',
      header: copy.columnActions,
      render: () => (
        <div className="table-actions">
          <Button type="button" variant="ghost">
            {copy.actionEdit}
          </Button>
          <Button type="button" variant="ghost">
            {copy.actionDelete}
          </Button>
        </div>
      ),
    },
  ]

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return data
    }

    return data.filter((cliente) => {
      const haystack = [
        cliente.nombre,
        cliente.identificacion,
        cliente.telefono,
        cliente.direccion,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(normalizedQuery)
    })
  }, [data, query])

  const emptyMessage = isLoading
    ? copy.loadingClients
    : error
      ? copy.errorClients
      : copy.noClients

  return (
    <section className="page">
      <PageHeader
        title={copy.pageClientsTitle}
        searchValue={query}
        searchPlaceholder={copy.searchClientsPlaceholder}
        searchAriaLabel={copy.searchClientsPlaceholder}
        onSearchChange={setQuery}
        actionLabel={copy.actionNew}
        onAction={() => {}}
      />
      {error ? <div className="alert">{error}</div> : null}
      <DataTable
        columns={columns}
        data={filtered}
        getRowKey={(row) => String(row.clienteId)}
        emptyMessage={emptyMessage}
      />
    </section>
  )
}
