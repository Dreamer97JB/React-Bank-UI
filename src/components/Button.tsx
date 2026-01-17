import { type ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost'
}

export function Button({
  variant = 'ghost',
  className = '',
  ...props
}: ButtonProps) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-ghost'

  return <button className={`btn ${variantClass} ${className}`.trim()} {...props} />
}
