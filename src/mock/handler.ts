import { rest } from 'msw'
import { RECORDS } from './records'

const baseURL = 'http://localhost:8000'

export const fetchIncompleteResponse = rest.get(baseURL, async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        id: '1',
        name: 'Fetch Reservation Records',
        createdOn: Date.now(),
        status: 'Incomplete',
      },
    ])
  )
})

export const fetchEmptyRecords = rest.get(baseURL, async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json([]))
})

export const fetchReservationResponse = rest.get(baseURL, async (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(RECORDS))
})

export const fetchFailureResponse = rest.get(baseURL, async (req, res, ctx) => {
  return res(ctx.status(500))
})

export const handlers = [
  fetchIncompleteResponse,
  fetchEmptyRecords,
  fetchReservationResponse,
  fetchFailureResponse,
]
