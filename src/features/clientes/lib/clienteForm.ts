import { type Copy } from '../../../lib/i18n'
import { type Cliente } from '../../../types/domain'

export type ClienteFormValues = {
  nombre: string
  genero: string
  edad: string
  identificacion: string
  direccion: string
  telefono: string
  contrasena: string
  estado: string
}

export type ClienteFormErrors = Partial<Record<keyof ClienteFormValues, string>>

const namePattern = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/
const addressPattern = /^[A-Za-z0-9ÁÉÍÓÚÑáéíóúñ\s]+$/
const digitsPattern = /^\d+$/

export function createEmptyClienteFormValues(): ClienteFormValues {
  return {
    nombre: '',
    genero: '',
    edad: '',
    identificacion: '',
    direccion: '',
    telefono: '',
    contrasena: '',
    estado: 'true',
  }
}

export function mapClienteToForm(cliente: Cliente): ClienteFormValues {
  const generoValue = cliente.genero?.trim() ?? ''
  const generoLower = generoValue.toLowerCase()
  const genero =
    generoLower === 'masculino'
      ? 'M'
      : generoLower === 'femenino'
        ? 'F'
        : generoValue

  return {
    nombre: cliente.nombre ?? '',
    genero,
    edad: cliente.edad ? String(cliente.edad) : '',
    identificacion: cliente.identificacion ?? '',
    direccion: cliente.direccion ?? '',
    telefono: cliente.telefono ?? '',
    contrasena: cliente.contrasena ?? '',
    estado: String(cliente.estado ?? true),
  }
}

export function toClientePayload(values: ClienteFormValues): Omit<Cliente, 'clienteId'> {
  return {
    nombre: values.nombre.trim(),
    genero: values.genero,
    edad: Number(values.edad),
    identificacion: values.identificacion.trim(),
    direccion: values.direccion.trim(),
    telefono: values.telefono.trim(),
    contrasena: values.contrasena.trim(),
    estado: values.estado === 'true',
  }
}

export function validateClienteForm(values: ClienteFormValues, copy: Copy): ClienteFormErrors {
  const errors: ClienteFormErrors = {}

  if (!values.nombre.trim()) {
    errors.nombre = copy.validationRequired
  } else if (!namePattern.test(values.nombre.trim())) {
    errors.nombre = copy.validationName
  }

  if (!values.genero.trim()) {
    errors.genero = copy.validationRequired
  }

  if (!values.edad.trim()) {
    errors.edad = copy.validationRequired
  } else if (!digitsPattern.test(values.edad.trim())) {
    errors.edad = copy.validationAge
  } else {
    const age = Number(values.edad)
    if (Number.isNaN(age) || age < 1 || age > 120) {
      errors.edad = copy.validationAge
    }
  }

  if (!values.identificacion.trim()) {
    errors.identificacion = copy.validationRequired
  } else if (!digitsPattern.test(values.identificacion.trim()) || values.identificacion.trim().length !== 10) {
    errors.identificacion = copy.validationId
  }

  if (!values.direccion.trim()) {
    errors.direccion = copy.validationRequired
  } else if (!addressPattern.test(values.direccion.trim())) {
    errors.direccion = copy.validationAddress
  }

  if (!values.telefono.trim()) {
    errors.telefono = copy.validationRequired
  } else if (!digitsPattern.test(values.telefono.trim())) {
    errors.telefono = copy.validationPhone
  } else if (values.telefono.trim().length < 9 || values.telefono.trim().length > 10) {
    errors.telefono = copy.validationPhone
  }

  if (!values.contrasena.trim()) {
    errors.contrasena = copy.validationRequired
  } else if (!digitsPattern.test(values.contrasena.trim())) {
    errors.contrasena = copy.validationPassword
  } else if (values.contrasena.trim().length < 4 || values.contrasena.trim().length > 10) {
    errors.contrasena = copy.validationPassword
  }

  if (!values.estado.trim()) {
    errors.estado = copy.validationRequired
  }

  return errors
}
