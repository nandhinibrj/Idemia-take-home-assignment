import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Main from '../pages/main'
import React from 'react'

const renderMain = () => {
  render(<Main />)
}

describe('MainPage', () => {

  it('should display search page and fields', () => {
    renderMain()
    //Stay fields
    expect(screen.getByText('Stay')).toBeInTheDocument()
    expect(screen.getByTestId('arrivalDate')).toBeInTheDocument()
    expect(screen.getByTestId('departureDate')).toBeInTheDocument()
    expect(screen.getByTestId('room-size')).toBeInTheDocument()
    // Guest fields
    expect(screen.getByText('Guest')).toBeInTheDocument()
    expect(screen.getByTestId('first-name')).toBeInTheDocument()
    expect(screen.getByTestId('last-name')).toBeInTheDocument()
    // Guest contact fields
    expect(screen.getByText('Guest Contact')).toBeInTheDocument()
    const state = screen.getByTestId('State')
    const zipcode = screen.getByTestId('zipcode')
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByTestId('phone')).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    expect(zipcode).toBeInTheDocument()
    // Search button
    expect(screen.getByTestId('search-button')).toBeInTheDocument()
  })
  it('should display records table', async () => {
    renderMain()
    const room_size = screen.getByTestId('room-size')
    expect(room_size).toBeInTheDocument()
    // eslint-disable-next-line testing-library/no-wait-for-side-effects
    fireEvent.change(room_size, { target: { value: 'Residential' } })
    fireEvent.click(screen.getByTestId('search-button'))
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Add New Record/i })).toBeInTheDocument()
    })
  })
})
