import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input'
import { Modal } from '../../../components/Modal'
import { PageHeader } from '../../../components/PageHeader'
import { DataTable, type Column } from '../../../components/Table'
import { getCopy } from '../../../lib/i18n'
import { type Cliente } from '../../../types/domain'
import { useClientes } from '../hooks/useClientes'
import {
  createEmptyClienteFormValues,
  mapClienteToForm,
  toClientePayload,
  validateClienteForm,
  type ClienteFormErrors,
  type ClienteFormValues,
} from '../lib/clienteForm'

export function ClientesPage() {
  const { data, isLoading, error, createCliente, updateCliente, deleteCliente } = useClientes()
  const [query, setQuery] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null)
  const [formValues, setFormValues] = useState<ClienteFormValues>(
    createEmptyClienteFormValues()
  )
  const [formErrors, setFormErrors] = useState<ClienteFormErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const copy = getCopy()

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

  const openNew = () => {
    setEditingCliente(null)
    setFormValues(createEmptyClienteFormValues())
    setFormErrors({})
    setFormError(null)
    setIsModalOpen(true)
  }

  const openEdit = (cliente: Cliente) => {
    setEditingCliente(cliente)
    setFormValues(mapClienteToForm(cliente))
    setFormErrors({})
    setFormError(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setFormErrors({})
    setFormError(null)
  }

  const handleFieldChange =
    (field: keyof ClienteFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value
      setFormValues((prevState) => ({ ...prevState, [field]: value }))
      setFormErrors((prevState) => ({ ...prevState, [field]: undefined }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    const errors = validateClienteForm(formValues, copy)
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) {
      setFormError(copy.validationGeneric)
      return
    }

    setIsSaving(true)

    try {
      const payload = toClientePayload(formValues)
      if (editingCliente) {
        await updateCliente(editingCliente.clienteId, payload)
      } else {
        await createCliente(payload)
      }
      setIsModalOpen(false)
      setFormValues(createEmptyClienteFormValues())
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.formSubmitError
      setFormError(message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (cliente: Cliente) => {
    setActionError(null)
    if (!window.confirm(copy.deleteConfirm)) {
      return
    }

    try {
      await deleteCliente(cliente.clienteId)
    } catch (error) {
      const message = error instanceof Error ? error.message : copy.formDeleteError
      setActionError(message)
    }
  }

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
      render: (row) => (
        <div className="table-actions">
          <Button type="button" variant="ghost" onClick={() => openEdit(row)}>
            {copy.actionEdit}
          </Button>
          <Button type="button" variant="ghost" onClick={() => handleDelete(row)}>
            {copy.actionDelete}
          </Button>
        </div>
      ),
    },
  ]

  const fieldClassName = (fieldError?: string) =>
    `input ${fieldError ? 'input-error' : ''}`.trim()

  return (
    <section className="page">
      <PageHeader
        title={copy.pageClientsTitle}
        searchValue={query}
        searchPlaceholder={copy.searchClientsPlaceholder}
        searchAriaLabel={copy.searchClientsPlaceholder}
        onSearchChange={setQuery}
        actionLabel={copy.actionNew}
        onAction={openNew}
      />
      {error ? <div className="alert">{error}</div> : null}
      {actionError ? <div className="alert">{actionError}</div> : null}
      <DataTable
        columns={columns}
        data={filtered}
        getRowKey={(row) => String(row.clienteId)}
        emptyMessage={emptyMessage}
      />

      <Modal
        isOpen={isModalOpen}
        title={editingCliente ? copy.formEditClientTitle : copy.formNewClientTitle}
        closeLabel={copy.modalClose}
        onClose={closeModal}
      >
        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          {formError ? <div className="alert">{formError}</div> : null}
          <div className="form-grid">
            <label className="field">
              <span className="field-label">{copy.formName}</span>
              <Input
                value={formValues.nombre}
                onChange={handleFieldChange('nombre')}
                hasError={Boolean(formErrors.nombre)}
              />
              {formErrors.nombre ? (
                <span className="field-error">{formErrors.nombre}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formGender}</span>
              <select
                className={fieldClassName(formErrors.genero)}
                value={formValues.genero}
                onChange={handleFieldChange('genero')}
              >
                <option value="">{copy.formSelectPlaceholder}</option>
                <option value="M">{copy.formGenderMale}</option>
                <option value="F">{copy.formGenderFemale}</option>
              </select>
              {formErrors.genero ? (
                <span className="field-error">{formErrors.genero}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formAge}</span>
              <Input
                value={formValues.edad}
                onChange={handleFieldChange('edad')}
                hasError={Boolean(formErrors.edad)}
                inputMode="numeric"
              />
              {formErrors.edad ? (
                <span className="field-error">{formErrors.edad}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formIdentification}</span>
              <Input
                value={formValues.identificacion}
                onChange={handleFieldChange('identificacion')}
                hasError={Boolean(formErrors.identificacion)}
                inputMode="numeric"
              />
              {formErrors.identificacion ? (
                <span className="field-error">{formErrors.identificacion}</span>
              ) : null}
            </label>

            <label className="field field-span">
              <span className="field-label">{copy.formAddress}</span>
              <Input
                value={formValues.direccion}
                onChange={handleFieldChange('direccion')}
                hasError={Boolean(formErrors.direccion)}
              />
              {formErrors.direccion ? (
                <span className="field-error">{formErrors.direccion}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formPhone}</span>
              <Input
                value={formValues.telefono}
                onChange={handleFieldChange('telefono')}
                hasError={Boolean(formErrors.telefono)}
                inputMode="numeric"
              />
              {formErrors.telefono ? (
                <span className="field-error">{formErrors.telefono}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formPassword}</span>
              <Input
                type="password"
                value={formValues.contrasena}
                onChange={handleFieldChange('contrasena')}
                hasError={Boolean(formErrors.contrasena)}
                inputMode="numeric"
              />
              {formErrors.contrasena ? (
                <span className="field-error">{formErrors.contrasena}</span>
              ) : null}
            </label>

            <label className="field">
              <span className="field-label">{copy.formStatus}</span>
              <select
                className={fieldClassName(formErrors.estado)}
                value={formValues.estado}
                onChange={handleFieldChange('estado')}
              >
                <option value="true">{copy.formStatusActive}</option>
                <option value="false">{copy.formStatusInactive}</option>
              </select>
              {formErrors.estado ? (
                <span className="field-error">{formErrors.estado}</span>
              ) : null}
            </label>
          </div>

          <div className="modal-footer">
            <Button type="button" variant="ghost" onClick={closeModal}>
              {copy.formCancel}
            </Button>
            <Button type="submit" variant="primary" disabled={isSaving}>
              {copy.formSave}
            </Button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
