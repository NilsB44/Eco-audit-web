import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import Page from '../page'

test('Home page renders correctly', () => {
  render(<Page />)
  expect(screen.getAllByText(/EcoStep/i).length).toBeGreaterThan(0)
})