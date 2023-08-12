import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('Description', () => {
  it('renders without crashing', () => {
    render(<App />);
    screen.getByText('Hotel Reservation System')
  });
})
