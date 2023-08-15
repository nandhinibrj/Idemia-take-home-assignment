/* eslint-disable testing-library/prefer-screen-queries */
import { test, expect } from '@playwright/test'

const getLocalDate = (value: string) => {
  const offset = new Date().getTimezoneOffset() * 1000 * 60
  const offsetDate = new Date(value).valueOf() - offset
  const date = new Date(offsetDate).toISOString()
  return date.substring(0, 16)
}
test('should display a title', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await expect(page.getByText('Hotel Reservation System')).toBeTruthy()
})

test('should search reservation record', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByTestId('first-name').fill('IDM')
  await page.getByTestId('last-name').fill('ENG')
  await page.getByRole('button', { name: /Search/i }).click()
  await expect(page.getByText('IDM ENG')).toBeTruthy()
})

test('should update a reservation record', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.getByTestId('first-name').fill('IDM')
  await page.getByTestId('last-name').fill('ENG')
  await page.getByRole('button', { name: /Search/i }).click()
  const rows = await page.getByRole('row').all()
  await rows[2].click()
  await expect(page.getByText('Update')).toBeTruthy()
  await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('IDM')
  await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('ENG')
  await page.getByRole('textbox', { name: 'First Name' }).fill('IDM-UPDATE')
  await page.getByRole('textbox', { name: 'Last Name' }).fill('ENG-UPDATE')
  await expect(page.getByRole('textbox', { name: 'First Name' })).toHaveValue('IDM-UPDATE')
  await expect(page.getByRole('textbox', { name: 'Last Name' })).toHaveValue('ENG-UPDATE')
  await page.getByRole('button', { name: /Save/i }).click()
  await expect(page.getByText('IDM-UPDATE ENG-UPDATE')).toBeTruthy()
})

test('should add new record to the reservation table', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.setViewportSize({ width: 900, height: 980 })
  await page.getByTestId('first-name').fill('IDM')
  await page.getByTestId('last-name').fill('ENG')
  await page.getByRole('button', { name: /Search/i }).click()
  await page.getByRole('button', { name: /Add New Record/i }).click()
  await page
    .getByRole('textbox', { name: 'Date of Arrival' })
    .fill(getLocalDate('11/18/2021, 01:00 AM'))
  await page
    .getByRole('textbox', { name: 'Date of Departure' })
    .fill(getLocalDate('11/25/2021, 01:00 AM'))
  await page.getByRole('button', { name: /Room Size/i }).click()
  await page.getByRole('option', { name: 'Junior' }).click()
  await page.getByTestId('room-quantity').type('2')
  await page.getByRole('textbox', { name: 'First Name' }).fill('NEW-FIRST-NAME')
  await page.getByRole('textbox', { name: 'Last Name' }).fill('NEW-LAST-NAME')
  await page.getByRole('textbox', { name: 'E-Mail' }).fill('NEW-EMAIL@gmail.com')
  await page.getByRole('textbox', { name: 'Phone Number' }).fill('(123)-456-7890')
  await page.getByRole('button', { name: /Save/i }).click()
  await page.mouse.down({ clickCount: 2 })
  await expect(page.getByText('sdfdsfdsf')).toBeTruthy()
  await expect(page.getByText('1')).toBeTruthy()
  await expect(page.getByText('NEW-FIRST-NAME NEW-LAST-NAME')).toBeTruthy()
  await expect(page.getByText('NEW-EMAIL@gmail.com')).toBeTruthy()
  await expect(page.getByText('(123)-456-7890')).toBeTruthy()
})
