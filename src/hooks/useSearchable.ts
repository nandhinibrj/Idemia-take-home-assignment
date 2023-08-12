import React from 'react'
import { filterSearchParam } from '../utils/helper'
import { HotelReservation } from '../types/model'

function useSearchable(data: HotelReservation[], searchProps: HotelReservation) {
  const filteredRecord = React.useMemo(
    () => filterSearchParam(data, searchProps),
    [data, searchProps]
  )
  return filteredRecord
}

export default useSearchable
