import { getCopy } from '../../lib/i18n'

export function TopBar() {
  const copy = getCopy()

  return (
    <header className="app-topbar">
      <div className="brand">
        <svg
          className="brand-icon"
          width="36"
          height="28"
          viewBox="0 0 36 28"
          aria-hidden="true"
        >
          <rect x="2" y="10" width="20" height="14" rx="3" />
          <rect x="12" y="2" width="20" height="14" rx="3" />
          <circle cx="12" cy="17" r="2.5" />
        </svg>
        <span className="brand-name">{copy.brandName}</span>
      </div>
    </header>
  )
}
