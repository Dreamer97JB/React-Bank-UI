export type Locale = 'es' | 'en'

export type Copy = {
  brandName: string
  navClients: string
  navAccounts: string
  navMovements: string
  navReports: string
  pageClientsTitle: string
  pageAccountsTitle: string
  pageMovementsTitle: string
  pageReportsTitle: string
  searchClientsPlaceholder: string
  searchAccountsPlaceholder: string
  searchMovementsPlaceholder: string
  actionNew: string
  actionEdit: string
  actionDelete: string
  modalClose: string
  formNewClientTitle: string
  formEditClientTitle: string
  formName: string
  formGender: string
  formGenderMale: string
  formGenderFemale: string
  formAge: string
  formIdentification: string
  formAddress: string
  formPhone: string
  formPassword: string
  formStatus: string
  formStatusActive: string
  formStatusInactive: string
  formSelectPlaceholder: string
  formSave: string
  formCancel: string
  formSubmitError: string
  formDeleteError: string
  deleteConfirm: string
  validationRequired: string
  validationName: string
  validationAddress: string
  validationAge: string
  validationId: string
  validationPhone: string
  validationPassword: string
  validationGeneric: string
  statusActive: string
  statusInactive: string
  loadingClients: string
  errorClients: string
  loadingAccounts: string
  errorAccounts: string
  loadingMovements: string
  errorMovements: string
  loadingReports: string
  errorReports: string
  noClients: string
  noAccounts: string
  noMovements: string
  noReports: string
  reportsSubtitle: string
  reportsGenerate: string
  reportsDownload: string
  reportsClientId: string
  reportsStartDate: string
  reportsEndDate: string
  reportFiltersLabel: string
  columnName: string
  columnIdentification: string
  columnPhone: string
  columnAddress: string
  columnStatus: string
  columnActions: string
  columnAccountNumber: string
  columnAccountType: string
  columnInitialBalance: string
  columnClient: string
  columnDate: string
  columnType: string
  columnValue: string
  columnBalance: string
  columnAccount: string
  columnMovement: string
  columnAvailableBalance: string
}

const translations: Record<Locale, Copy> = {
  es: {
    brandName: 'Banco',
    navClients: 'Clientes',
    navAccounts: 'Cuentas',
    navMovements: 'Movimientos',
    navReports: 'Reportes',
    pageClientsTitle: 'Clientes',
    pageAccountsTitle: 'Cuentas',
    pageMovementsTitle: 'Movimientos',
    pageReportsTitle: 'Reportes',
    searchClientsPlaceholder: 'Buscar clientes',
    searchAccountsPlaceholder: 'Buscar cuentas',
    searchMovementsPlaceholder: 'Buscar movimientos',
    actionNew: 'Nuevo',
    actionEdit: 'Editar',
    actionDelete: 'Eliminar',
    modalClose: 'Cerrar',
    formNewClientTitle: 'Nuevo cliente',
    formEditClientTitle: 'Editar cliente',
    formName: 'Nombre',
    formGender: 'G\u00e9nero',
    formGenderMale: 'Masculino',
    formGenderFemale: 'Femenino',
    formAge: 'Edad',
    formIdentification: 'Identificaci\u00f3n',
    formAddress: 'Direcci\u00f3n',
    formPhone: 'Tel\u00e9fono',
    formPassword: 'Contrase\u00f1a',
    formStatus: 'Estado',
    formStatusActive: 'Activo',
    formStatusInactive: 'Inactivo',
    formSelectPlaceholder: 'Seleccionar',
    formSave: 'Guardar',
    formCancel: 'Cancelar',
    formSubmitError: 'No se pudo guardar el cliente.',
    formDeleteError: 'No se pudo eliminar el cliente.',
    deleteConfirm: '\u00bfEliminar este cliente?',
    validationRequired: 'Este campo es obligatorio.',
    validationName: 'Solo letras y espacios.',
    validationAddress: 'Solo letras, n\u00fameros y espacios.',
    validationAge: 'Debe ser un n\u00famero entre 1 y 120.',
    validationId: 'Debe tener 10 d\u00edgitos num\u00e9ricos.',
    validationPhone: 'Debe tener entre 9 y 10 d\u00edgitos.',
    validationPassword: 'Debe tener entre 4 y 10 d\u00edgitos.',
    validationGeneric: 'Revisa los campos marcados.',
    statusActive: 'Activo',
    statusInactive: 'Inactivo',
    loadingClients: 'Cargando clientes...',
    errorClients: 'No se pudieron cargar los clientes.',
    loadingAccounts: 'Cargando cuentas...',
    errorAccounts: 'No se pudieron cargar las cuentas.',
    loadingMovements: 'Cargando movimientos...',
    errorMovements: 'No se pudieron cargar los movimientos.',
    loadingReports: 'Cargando reportes...',
    errorReports: 'No se pudieron cargar los reportes.',
    noClients: 'No hay clientes disponibles.',
    noAccounts: 'No hay cuentas disponibles.',
    noMovements: 'No hay movimientos disponibles.',
    noReports: 'No hay reportes disponibles.',
    reportsSubtitle: 'Filtra movimientos por cliente y rango de fechas.',
    reportsGenerate: 'Generar',
    reportsDownload: 'Descargar PDF',
    reportsClientId: 'Cliente',
    reportsStartDate: 'Fecha inicio',
    reportsEndDate: 'Fecha fin',
    reportFiltersLabel: 'Filtros de reportes',
    columnName: 'Nombre',
    columnIdentification: 'Identificaci\u00f3n',
    columnPhone: 'Tel\u00e9fono',
    columnAddress: 'Direcci\u00f3n',
    columnStatus: 'Estado',
    columnActions: 'Acciones',
    columnAccountNumber: 'N\u00famero cuenta',
    columnAccountType: 'Tipo cuenta',
    columnInitialBalance: 'Saldo inicial',
    columnClient: 'Cliente',
    columnDate: 'Fecha',
    columnType: 'Tipo',
    columnValue: 'Valor',
    columnBalance: 'Saldo',
    columnAccount: 'Cuenta',
    columnMovement: 'Movimiento',
    columnAvailableBalance: 'Saldo disponible',
  },
  en: {
    brandName: 'Bank',
    navClients: 'Clients',
    navAccounts: 'Accounts',
    navMovements: 'Movements',
    navReports: 'Reports',
    pageClientsTitle: 'Clients',
    pageAccountsTitle: 'Accounts',
    pageMovementsTitle: 'Movements',
    pageReportsTitle: 'Reports',
    searchClientsPlaceholder: 'Search clients',
    searchAccountsPlaceholder: 'Search accounts',
    searchMovementsPlaceholder: 'Search movements',
    actionNew: 'New',
    actionEdit: 'Edit',
    actionDelete: 'Delete',
    modalClose: 'Close',
    formNewClientTitle: 'New client',
    formEditClientTitle: 'Edit client',
    formName: 'Name',
    formGender: 'Gender',
    formGenderMale: 'Male',
    formGenderFemale: 'Female',
    formAge: 'Age',
    formIdentification: 'Identification',
    formAddress: 'Address',
    formPhone: 'Phone',
    formPassword: 'Password',
    formStatus: 'Status',
    formStatusActive: 'Active',
    formStatusInactive: 'Inactive',
    formSelectPlaceholder: 'Select',
    formSave: 'Save',
    formCancel: 'Cancel',
    formSubmitError: 'Unable to save the client.',
    formDeleteError: 'Unable to delete the client.',
    deleteConfirm: 'Delete this client?',
    validationRequired: 'This field is required.',
    validationName: 'Only letters and spaces are allowed.',
    validationAddress: 'Only letters, numbers, and spaces are allowed.',
    validationAge: 'Must be a number between 1 and 120.',
    validationId: 'Must be 10 digits.',
    validationPhone: 'Must be 9 to 10 digits.',
    validationPassword: 'Must be 4 to 10 digits.',
    validationGeneric: 'Review the highlighted fields.',
    statusActive: 'Active',
    statusInactive: 'Inactive',
    loadingClients: 'Loading clients...',
    errorClients: 'Unable to load clients.',
    loadingAccounts: 'Loading accounts...',
    errorAccounts: 'Unable to load accounts.',
    loadingMovements: 'Loading movements...',
    errorMovements: 'Unable to load movements.',
    loadingReports: 'Loading reports...',
    errorReports: 'Unable to load reports.',
    noClients: 'No clients available.',
    noAccounts: 'No accounts available.',
    noMovements: 'No movements available.',
    noReports: 'No reports available.',
    reportsSubtitle: 'Filter movements by client and date range.',
    reportsGenerate: 'Generate',
    reportsDownload: 'Download PDF',
    reportsClientId: 'Client',
    reportsStartDate: 'Start date',
    reportsEndDate: 'End date',
    reportFiltersLabel: 'Report filters',
    columnName: 'Name',
    columnIdentification: 'Identification',
    columnPhone: 'Phone',
    columnAddress: 'Address',
    columnStatus: 'Status',
    columnActions: 'Actions',
    columnAccountNumber: 'Account number',
    columnAccountType: 'Account type',
    columnInitialBalance: 'Initial balance',
    columnClient: 'Client',
    columnDate: 'Date',
    columnType: 'Type',
    columnValue: 'Value',
    columnBalance: 'Balance',
    columnAccount: 'Account',
    columnMovement: 'Movement',
    columnAvailableBalance: 'Available balance',
  },
}

export const defaultLocale: Locale = 'es'

export function getCopy(locale: Locale = defaultLocale): Copy {
  return translations[locale]
}
