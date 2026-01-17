export type Cliente = {
  clienteId: string | number
  nombre: string
  genero: string
  edad: number
  identificacion: string
  direccion: string
  telefono: string
  contrasena: string
  estado: boolean
}

export type Cuenta = {
  numeroCuenta: string | number
  tipoCuenta: string
  saldoInicial: number
  estado: boolean
  clienteId: string | number
}

export type Movimiento = {
  movimientoId: string | number
  fecha: string
  tipoMovimiento: string
  valor: number
  saldo: number
  numeroCuenta: string | number
}

export type ReporteMovimiento = {
  fecha: string
  cliente: string
  numeroCuenta: string | number
  tipo: string
  saldoInicial: number
  estado: boolean
  movimiento: number
  saldoDisponible: number
}

export type ReportesResponse = {
  data: ReporteMovimiento[]
  pdfBase64?: string | null
}

export type ApiError = {
  message: string
}
