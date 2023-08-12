import { Box, CircularProgress, Paper } from '@mui/material'
import React from 'react'
import Reservation from '../component/Search/Reservation'
import { HotelReservation } from '../types/model'
import SearchResults from '../component/Search/SearchResults'
import useFetch from '../hooks/useFetch'
import { filterSearchParam } from '../utils/helper'

const Main = () => {
  const { isFetching, data } = useFetch()
  const [search, setSearch] = React.useState<Partial<HotelReservation>>()
  const [records, setRecords] = React.useState<HotelReservation[]>(data)

  React.useEffect(() => setRecords(data), [data])

  React.useEffect(() => {
    if (search) {
      const filtered: HotelReservation[] = filterSearchParam(data, search)
      filtered && setRecords(filtered)
    }
  }, [data, search])

  isFetching && (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  )

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={1}
    >
      <Paper
        variant="elevation"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 400,
          padding: 1,
          zIndex: 1,
          border: '1px double white',
          width: '95%',
        }}
      >
        <Reservation search={true} setSearch={setSearch} />
      </Paper>
      {search && (
        <Paper
          variant="elevation"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 400,
            maxWidth: '100%',
            padding: 1,
            zIndex: 1,
            border: '1px double white',
            color: 'white',
          }}
        >
          {records && (
            <SearchResults records={records} setRecords={setRecords}></SearchResults>
          )}
        </Paper>
      )}
    </Box>
  )
}

export default Main
