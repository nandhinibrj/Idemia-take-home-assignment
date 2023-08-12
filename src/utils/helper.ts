import { AddressLocation, HotelReservation, Room, Stay } from '../types/model'

type PickByObject = Pick<HotelReservation, 'stay' | 'room'>
type PickByValue = Pick<HotelReservation, 'firstName' | 'lastName' | 'email' | 'phone'>

export const filterSearchParam = (
  data: HotelReservation[],
  searchProps: Partial<HotelReservation>
) => {
  return data.filter(({ id, ...item }) => {
    return Object.entries(searchProps).find(([key, value]) => {
      if (key === 'address') {
        return Object.entries(value).find(([address_key, address_val]) => {
          return Object.entries(address_val).some(([subkey, subval]) => {
            return item.address?.addressLocation?.[subkey as keyof AddressLocation] === subval
          })
        })
      } else if (typeof value === 'object') {
        return Object.entries(value).find(([objField, objVal]) => {
          return item[key as keyof PickByObject][objField as keyof (Stay | Room)] === objVal
        })
      } else {
        console.log("herer",value)
        return item[key as keyof PickByValue] === value
      }
    })
  })
}
