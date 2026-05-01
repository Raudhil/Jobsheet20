import { render, screen } from '@testing-library/react'
import { describe, it, expect } from '@jest/globals'
import Footer from '@/components/layouts/footer'

describe('Footer Component', () => {
  it('renders footer correctly', () => {
    const component = render(<Footer />)
    expect(screen.getByTestId('footer-text').textContent).toBe(
      '\u00A9 2026 My App. All rights reserved.'
    )
    expect(component).toMatchSnapshot()
  })
})
