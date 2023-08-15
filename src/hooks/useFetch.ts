import React from 'react'
import { HotelReservationAPIService } from '../service'
import { HotelReservation } from '../types/model'

function useFetch() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hotelReservationAPIService = new HotelReservationAPIService()
  const [isFetching, setFetching] = React.useState<boolean>(false)
  const [data, setData] = React.useState<HotelReservation[]>([])

  React.useEffect(() => {
    const getSearchResultData = async () => {
      setFetching(true)
      const results = await hotelReservationAPIService
        .getSearchResults()
        .then((response) => response)
        .finally(() => setFetching(false))
      setData(results as unknown as HotelReservation[])
    }
    getSearchResultData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return { isFetching, data }
}

export default useFetch
