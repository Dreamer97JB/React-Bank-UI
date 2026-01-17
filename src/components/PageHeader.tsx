import { Button } from './Button'
import { Input } from './Input'

export type PageHeaderProps = {
  title: string
  searchValue: string
  searchPlaceholder?: string
  searchAriaLabel?: string
  onSearchChange: (value: string) => void
  actionLabel: string
  onAction: () => void
}

export function PageHeader({
  title,
  searchValue,
  searchPlaceholder = 'Search',
  searchAriaLabel,
  onSearchChange,
  actionLabel,
  onAction,
}: PageHeaderProps) {
  const inputLabel = searchAriaLabel ?? searchPlaceholder ?? `${title} search`

  return (
    <header className="page-header">
      <h1 className="page-title">{title}</h1>
      <div className="page-actions">
        <Input
          aria-label={inputLabel}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Button type="button" variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      </div>
    </header>
  )
}
