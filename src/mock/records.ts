import { HotelReservation } from "../types/model";

export const RECORDS: HotelReservation[] = [
    {
      id: 1,
      stay: {
        arrivalDate: '2021-11-18T05:00:00.000Z',
        departureDate: '2021-11-25T05:00:00.000Z',
      },
      room: {
        roomSize: 'Executive',
        roomQuantity: 3,
      },
      firstName: 'IDM',
      lastName: 'ENG',
      email: 'idm.test@idm.com',
      phone: '(123)-456-7890',
      address: {
        addressStreet: {
          streetName: 'IDM Street',
          streetNumber: '1234',
        },
        addressLocation: {
          zipCode: 'A1B 2C3',
          state: 'Ontario',
          city: 'Oakville',
        },
      },
      extras: ['ExtraBreakfast', 'ExtraTV', 'ExtraWiFi', 'ExtraParking', 'ExtraBalcony'],
      payment: 'Credit Card',
      note: 'idm lab test',
      tags: ['hotel', 'booking', 'labtest'],
      reminder: true,
      newsletter: true,
      confirm: true,
    },
    {
      id: 2,
      stay: {
        arrivalDate: '2021-11-01T04:00:00.000Z',
        departureDate: '2021-11-04T04:00:00.000Z',
      },
      room: {
        roomSize: 'Residential',
        roomQuantity: 2,
      },
      firstName: 'IDM',
      lastName: 'PM',
      email: 'idm.op@idm.com',
      phone: '(234)-567-8910',
      address: {
        addressStreet: {
          streetName: 'IDM',
          streetNumber: '1234',
        },
        addressLocation: {
          zipCode: 'B2C 3D4',
          state: 'Ontario',
          city: 'Ottawa',
        },
      },
      extras: ['ExtraParking', 'ExtraBalcony'],
      payment: 'Cash',
      note: 'lab test',
      tags: ['angular', 'material', 'labtest'],
      reminder: true,
      newsletter: false,
      confirm: true,
    },
  ]