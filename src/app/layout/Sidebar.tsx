import { NavLink } from 'react-router-dom'
import { getCopy } from '../../lib/i18n'

export function Sidebar() {
  const copy = getCopy()
  const navItems = [
    { to: '/clientes', label: copy.navClients },
    { to: '/cuentas', label: copy.navAccounts },
    { to: '/movimientos', label: copy.navMovements },
    { to: '/reportes', label: copy.navReports },
  ]

  return (
    <aside className="app-sidebar">
      <nav className="nav-list">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'nav-link nav-link-active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
