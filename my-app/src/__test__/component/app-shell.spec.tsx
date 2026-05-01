import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, jest } from '@jest/globals'
import AppShell from '@/components/layouts/AppShell'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/dashboard',
      push: jest.fn(),
    }
  },
}))

jest.mock('next-auth/react', () => ({
  useSession() {
    return {
      status: 'authenticated',
    }
  },
}))

jest.mock('next/font/google', () => ({
  Roboto: () => ({
    className: 'roboto',
  }),
}))

jest.mock('../../components/layouts/navbar', () => () => (
  <div data-testid="navbar">Navbar</div>
))

describe('AppShell Component', () => {
  it('renders children and navbar correctly', async () => {
    render(
      <AppShell>
        <div data-testid="child">AppShell Content</div>
      </AppShell>
    )

    await waitFor(() => {
      expect(screen.getByTestId('navbar').textContent).toBe('Navbar')
      expect(screen.getByTestId('child').textContent).toBe('AppShell Content')
    })
  })
})
