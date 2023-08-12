import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Reservation from './Reservation'
import { STATES } from '../../utils/const'
import { RECORDS } from '../../mock/records'

const setFilteredRecord = jest.fn()
const hasError = jest.fn()
const setSearch = jest.fn()

const renderSearchPage = () => {
  render(<Reservation search={true} setSearch={setSearch} />)
}

const renderModalPage = () => {
  render(
    <Reservation
      search={false}
      filteredRecord={RECORDS[0]}
      setFilteredRecord={setFilteredRecord}
      hasError={hasError}
    />
  )
}

const getLocalDate = (value: string) => {
  const offset = new Date().getTimezoneOffset() * 1000 * 60
  const offsetDate = new Date(value).valueOf() - offset
  const date = new Date(offsetDate).toISOString()
  return date.substring(0, 16)
}

describe('Reservation page', () => {
  it('should display arrival, departure date, room size, name, contact, address with validation', () => {
    renderSearchPage()
    const arrival_date = screen.getByTestId('arrivalDate')
    const departure_date = screen.getByTestId('departureDate')
    expect(arrival_date).toBeInTheDocument()
    fireEvent.change(arrival_date, { target: { value: getLocalDate('11/18/2021, 01:00 AM') } })
    expect(arrival_date).toHaveValue('2021-11-18T02:00')
    expect(departure_date).toBeInTheDocument()
    fireEvent.change(departure_date, { target: { value: getLocalDate('11/25/2021, 01:00 AM') } })
    expect(departure_date).toHaveValue('2021-11-25T02:00')
    const room_size = screen.getByTestId('room-size')
    expect(room_size).toBeInTheDocument()
    fireEvent.change(room_size, { target: { value: 'Junior' } })
    expect(room_size).toHaveValue('Junior')
    const first_name = screen.getByTestId('first-name')
    expect(first_name).toBeInTheDocument()
    fireEvent.change(first_name, { target: { value: 'test-first-name' } })
    expect(first_name).toHaveValue('test-first-name')
    const last_name = screen.getByTestId('last-name')
    expect(last_name).toBeInTheDocument()
    fireEvent.change(last_name, { target: { value: 'test-last-name' } })
    expect(last_name).toHaveValue('test-last-name')
    const email = screen.getByTestId('email')
    const phone = screen.getByTestId('phone')
    const state = screen.getByTestId('State')
    const zipcode = screen.getByTestId('zipcode')
    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    fireEvent.click(state)
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(STATES.length)
    options.forEach((item, index) => {
      expect(item.textContent).toBe(STATES[index])
    })
    expect(zipcode).toBeInTheDocument()
  })

  it('should hide modal fields(room quantity, address, extras, payment, tags, remainder, newsletter, confirm)', () => {
    renderSearchPage()
    expect(screen.queryByTestId('room_quantity')).toBeNull()
    expect(screen.queryByTestId('street_no')).toBeNull()
    expect(screen.queryByTestId('street_name')).toBeNull()
    expect(screen.queryByTestId('Extras')).toBeNull()
    expect(screen.queryByTestId('pay_by')).toBeNull()
    expect(screen.queryByTestId('Tags')).toBeNull()
    expect(screen.queryByTestId('remainder')).toBeNull()
    expect(screen.queryByTestId('newsletter')).toBeNull()
    expect(screen.queryByTestId('confirm')).toBeNull()
  })

  it('should validate first name', () => {
    renderSearchPage()
    const first_name = screen.getByTestId('first-name')
    fireEvent.change(first_name, {
      target: { value: 'test-first-name-test-first-name-test-first-name-test-first-name' },
    })
    expect(screen.getByText('value is not in the range of 3 / 25')).toBeInTheDocument()
  })

  it('should validate last name', () => {
    renderSearchPage()
    const last_name = screen.getByTestId('last-name')
    fireEvent.change(last_name, {
      target: {
        value:
          'test-last-name-test-last-name-test-last-name-test-last-name-test-last-name-test-last-name-test-last-name-test-last-name',
      },
    })
    expect(screen.getByText('value is not in the range of 3 / 50')).toBeInTheDocument()
  })

  it('should validate email', () => {
    renderSearchPage()
    const email = screen.getByTestId('email')
    fireEvent.change(email, {
      target: {
        value: 'test',
      },
    })
    expect(screen.getByText('email is not valid')).toBeInTheDocument()
  })

  it('should validate phone', () => {
    renderSearchPage()
    const phone = screen.getByTestId('phone')
    fireEvent.change(phone, {
      target: {
        value: '12345',
      },
    })
    expect(screen.getByText('phone# is not valid')).toBeInTheDocument()
  })

  it('should validate zipcode', () => {
    renderSearchPage()
    const zipcode = screen.getByTestId('zipcode')
    fireEvent.change(zipcode, {
      target: {
        value: 'test',
      },
    })
    expect(screen.getByText('Zipcode is not valid')).toBeInTheDocument()
  })

  it('should display search button', () => {
    renderSearchPage()
    expect(screen.getByTestId('search-button')).toBeInTheDocument()
  })

  it("should send search data on 'search' button event", () => {
    renderSearchPage()
    const search_button = screen.getByTestId('search-button')
    const first_name = screen.getByTestId('first-name')
    fireEvent.change(first_name, { target: { value: 'test-first-name' } })
    expect(first_name).toHaveValue('test-first-name')
    fireEvent.click(search_button)
    expect(setSearch).toBeCalledTimes(1)
    expect(setSearch).toBeCalledWith({ firstName: 'test-first-name' })
  })

  it('should display modal page fields', () => {
    renderModalPage()
    const arrival_date = screen.getByTestId('arrivalDate')
    const departure_date = screen.getByTestId('departureDate')
    expect(arrival_date).toBeInTheDocument()
    expect(departure_date).toBeInTheDocument()
    const room_size = screen.getByTestId('room-size')
    expect(room_size).toBeInTheDocument()
    const first_name = screen.getByTestId('first-name')
    expect(first_name).toBeInTheDocument()
    const last_name = screen.getByTestId('last-name')
    expect(last_name).toBeInTheDocument()
    const email = screen.getByTestId('email')
    const phone = screen.getByTestId('phone')
    const state = screen.getByTestId('State')
    const zipcode = screen.getByTestId('zipcode')
    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
    expect(state).toBeInTheDocument()
    fireEvent.click(state)
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(STATES.length)
    options.forEach((item, index) => {
      expect(item.textContent).toBe(STATES[index])
    })
    expect(zipcode).toBeInTheDocument()
    expect(screen.getByTestId('room-quantity')).toBeInTheDocument()
    expect(screen.getByTestId('street_no')).toBeInTheDocument()
    expect(screen.getByTestId('street_name')).toBeInTheDocument()
    expect(screen.getByTestId('reminder')).toBeInTheDocument()
    expect(screen.getByTestId('newsletter')).toBeInTheDocument()
    expect(screen.getByTestId('confirm')).toBeInTheDocument()
  })
})
