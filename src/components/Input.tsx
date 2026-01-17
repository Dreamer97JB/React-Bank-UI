import { type InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

export function Input({ className = '', hasError = false, ...props }: InputProps) {
  const errorClass = hasError ? 'input-error' : ''

  return <input className={`input ${errorClass} ${className}`.trim()} {...props} />
}
