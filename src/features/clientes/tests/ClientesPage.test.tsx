import { render, screen } from '@testing-library/react'
import { ClientesPage } from '../pages/ClientesPage'

vi.mock('../hooks/useClientes', () => ({
  useClientes: () => ({ data: [], isLoading: false, error: null }),
}))

describe('ClientesPage', () => {
  it('renders the header actions', () => {
    render(<ClientesPage />)

    expect(screen.getByRole('heading', { name: /clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /nuevo/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/buscar clientes/i)).toBeInTheDocument()
  })
})
