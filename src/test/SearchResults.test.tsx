import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchResults from '../component/Search/SearchResults'
import { RECORDS } from '../mock/records'

const setRecords = jest.fn()

const renderSearchResultsPage = () => {
  render(<SearchResults records={RECORDS} setRecords={setRecords} />)
}

describe('Search Results page', () => {
  it("should display 'Add New Record' button", () => {
    renderSearchResultsPage()
    const add_button = screen.getByRole('button', { name: /Add New Record/i })
    expect(add_button).toBeInTheDocument()
  })

//   it('should display column headers of search results datagrid', async () => {
//     renderSearchResultsPage()
//     await waitFor(() => {
//       const columnHeaders = [
//         'Name',
//         'Arrival Date',
//         'Departure Date',
//         'Room Size',
//         'Room Quantity',
//         'Email & Phone',
//         'Address',
//         'Extras',
//       ]
//       const actualColumnHeaders = screen.getAllByRole('columnheader')
//       columnHeaders.forEach((name, index) => {
//         within(actualColumnHeaders[index]).getByLabelText(name)
//       })
//     })
//   })

  it("should display records", async() => {
    renderSearchResultsPage()
    await waitFor(() => {
        expect(screen.getAllByRole("row")).toHaveLength(4)
    })
  })

  it("should display modal header, content and action on row selection", () => {
    renderSearchResultsPage()
        const row = screen.getAllByRole("row")[2]
        fireEvent.click(row)
        // header
        expect(screen.getByText("Update")).toBeInTheDocument()
        // content
        expect(screen.getByLabelText("Stay")).toBeInTheDocument()
        expect(screen.getByText("Guest")).toBeInTheDocument()
        expect(screen.getByText("Guest Contact")).toBeInTheDocument()
        expect(screen.getByLabelText("Extras")).toBeInTheDocument()
        expect(screen.getByLabelText("Pay by")).toBeInTheDocument()
        expect(screen.getByText("Personal Note")).toBeInTheDocument()
        expect(screen.getByText("Tags")).toBeInTheDocument()
        // action
        expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument()
        expect(screen.getByRole("button", {name: "Discard"})).toBeInTheDocument()
  })
})
