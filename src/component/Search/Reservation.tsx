import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Switch,
  Typography,
} from '@mui/material'
import React from 'react'
import Columns from '../Common/Columns'
import CustomField from '../Common/CustomField'
import { CITIES, EXTRAS, PAYMENT, STATES, SUITES } from '../../utils/const'
import { City, Extras, HotelReservation, PickByValue, State } from '../../types/model'
import AutocompleteField from '../Common/AutocompleteField'

type SubFieldKeys = PickByValue<HotelReservation, { [key: string]: unknown }>
type SubAddress = PickByValue<HotelReservation['address'], { [key: string]: unknown }>

type Props =
  | {
      search: true
      setSearch: (search: Partial<HotelReservation>) => void
      filteredRecord?: never
      setFilteredRecord?: never
    }
  | {
      search: false
      filteredRecord: HotelReservation
      setFilteredRecord: (records: HotelReservation) => void
      setSearch?: never
    }

const Reservation: React.FC<Props> = ({
  search,
  setSearch,
  filteredRecord,
  setFilteredRecord,
}) => {
  const [currentSearch, setCurrentSearch] = React.useState<Partial<HotelReservation> | undefined>()

  const isEmpty = (field: string, value: string | number | undefined) => {
    if (!search) {
      if (!Boolean(value)) {
        return { error: true, helperText: `${field} cannot be empty` }
      }
    }
  }

  const compareDates = (arrivalDate: string, departureDate: string) => {
    if (new Date(arrivalDate) >= new Date(departureDate)) {
      return {
        error: true,
        helperText: 'departure date cannot be later than arrival date',
      }
    }
  }

  const validateCharacterLength = (value: string | undefined, min: number, max: number) => {
    if (value && value.length >= min && value.length >= max) {
      return {
        error: true,
        helperText: `value is not in the range of ${min} / ${max}`,
      }
    }
  }
  const validateEmail = (value: string | undefined) => {
    if (value && !value.match(/\S+@\S+\.\S+/)) {
      return { error: true, helperText: 'email is not valid' }
    }
  }

  const validatePhoneNo = (value: string | undefined) => {
    if (value && !value.match(/^\(?([0-9]{3})\)?[-.]?[0-9]{3}[-.]?([0-9]{4})$/)) {
      return {
        error: true,
        helperText: 'phone# is not valid',
      }
    }
  }

  const validateZipCode = (value: string | undefined) => {
    if (value && !value?.match(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)) {
      return {
        error: true,
        helperText: 'Zipcode is not valid',
      }
    }
  }

  const updateCurrent = React.useCallback(
    (update: Partial<HotelReservation>) => {
      search
        ? setCurrentSearch({ ...currentSearch, ...update })
        : setFilteredRecord({ ...filteredRecord!, ...update })
    },
    [currentSearch, filteredRecord, search, setFilteredRecord]
  )

  const updateSubField = <Key extends keyof SubFieldKeys>(
    key: Key,
    update: Partial<SubFieldKeys[Key]>
  ) =>
    updateCurrent({
      [key]: { ...(search ? currentSearch?.[key] : filteredRecord?.[key]), ...update },
    })

  const updateAddressField = <Key extends keyof SubAddress>(
    key: Key,
    update: Partial<SubAddress[Key]>
  ) =>
    updateSubField('address', {
      [key]: {
        ...(search ? currentSearch?.address?.[key] : filteredRecord?.address?.[key]),
        ...update,
      },
    })

  const fetchCities = () => {
    return search
      ? CITIES[currentSearch?.address?.addressLocation?.state as State] ?? []
      : CITIES[filteredRecord?.address?.addressLocation?.state as State] ?? []
  }

  const displayCity = () => {
    return search
      ? currentSearch?.address?.addressLocation?.city
      : filteredRecord?.address?.addressLocation?.city
  }

  const getLocalDate = (value: string) => {
    const offset = new Date().getTimezoneOffset() * 1000 * 60
    const offsetDate = new Date(value).valueOf() - offset
    const date = new Date(offsetDate).toISOString()
    return date.substring(0, 16)
  }

  const validateDates = () => {
    if (search && currentSearch?.stay?.arrivalDate && currentSearch?.stay?.departureDate) {
      return compareDates(currentSearch.stay.arrivalDate, currentSearch.stay.departureDate)
    } else {
      if (filteredRecord?.stay?.arrivalDate && filteredRecord?.stay?.departureDate) {
        return compareDates(filteredRecord.stay.arrivalDate, filteredRecord.stay.departureDate)
      }
    }
  }

  return (
    <Box display="flex" flexDirection="column" textAlign="left" gap={2}>
      {search && <Typography variant="h5">Search</Typography>}
      <Box
        component="form"
        sx={{
          '& .MuiDivider-root': { marginY: 1 },
          '& .MuiTextField-root': { m: 1, width: '25ch' },
          '& .MuiButton-root': { m: 1, width: '10ch' },
        }}
      >
        <FormGroup>
          <FormControl variant="standard">
            <FormLabel id="hotel-stay">Stay</FormLabel>
            <Columns columns={search ? 3 : 2}>
              <CustomField
                inputProps={{ 'data-testid': 'arrivalDate' }}
                label="Date of Arrival"
                type="datetime-local"
                value={
                  search
                    ? currentSearch?.stay?.arrivalDate
                    : filteredRecord?.stay?.arrivalDate &&
                      getLocalDate(filteredRecord.stay.arrivalDate)
                }
                {...isEmpty('arrivalDate', filteredRecord?.stay?.arrivalDate)}
                onChange={(arrivalDate: string) => updateSubField('stay', { arrivalDate })}
              />
              <CustomField
                inputProps={{ 'data-testid': 'departureDate' }}
                label="Date of Departure"
                type="datetime-local"
                value={
                  search
                    ? currentSearch?.stay?.departureDate
                    : filteredRecord?.stay?.departureDate &&
                      getLocalDate(filteredRecord.stay.departureDate)
                }
                {...(isEmpty('departureDate', filteredRecord?.stay?.departureDate) ||
                  validateDates())}
                onChange={(departureDate: string) => updateSubField('stay', { departureDate })}
              />

              <CustomField
                inputProps={{ 'data-testid': 'room-size' }}
                label="Room Size"
                options={SUITES}
                value={search ? currentSearch?.room?.roomSize : filteredRecord?.room?.roomSize}
                {...isEmpty('roomSize', filteredRecord?.room?.roomSize)}
                onChange={(roomSize) => updateSubField('room', { roomSize })}
              />
              {!search && (
                <CustomField
                  data-testid="room-quantity"
                  label="Room Quantity"
                  type="number"
                  helperText="A person can book at most 5 rooms at a moment"
                  inputProps={{ inputMode: 'numeric', min: 1, max: 5, pattern: '[0-9]*' }}
                  value={filteredRecord?.room?.roomQuantity}
                  onChange={(roomQuantity) =>
                    updateSubField('room', { roomQuantity: roomQuantity })
                  }
                />
              )}
            </Columns>
          </FormControl>
          <Divider />
          <FormControl variant="standard">
            <FormLabel id="hotel-stay">Guest</FormLabel>
            <Columns columns={2}>
              <CustomField
                inputProps={{ 'data-testid': 'first-name', 'qa-id': 'first-name' }}
                label="First Name"
                value={search ? currentSearch?.firstName : filteredRecord?.firstName}
                {...(isEmpty('firstName', filteredRecord?.firstName) ||
                  validateCharacterLength(
                    search ? currentSearch?.firstName : filteredRecord?.firstName,
                    3,
                    25
                  ))}
                onChange={(firstName: string) => updateCurrent({ firstName })}
              />
              <CustomField
                inputProps={{ 'data-testid': 'last-name', 'qa-id': 'last-name' }}
                label="Last Name"
                value={search ? currentSearch?.lastName : filteredRecord?.lastName}
                {...(isEmpty('lastName', filteredRecord?.lastName) ||
                  validateCharacterLength(
                    search ? currentSearch?.lastName : filteredRecord?.lastName,
                    3,
                    50
                  ))}
                onChange={(lastName: string) => updateCurrent({ lastName })}
              />
            </Columns>
          </FormControl>
          <Divider />
          <FormControl variant="standard">
            <FormLabel id="hotel-stay">Guest Contact</FormLabel>
            <Columns columns={search ? 5 : 2}>
              <CustomField
                inputProps={{ 'data-testid': 'email' }}
                type="email"
                label="E-Mail"
                value={search ? currentSearch?.email : filteredRecord?.email}
                {...(isEmpty('email', filteredRecord?.email) ||
                  validateEmail(search ? currentSearch?.email : filteredRecord?.email))}
                onChange={(email: string) => updateCurrent({ email })}
              />
              <CustomField
                inputProps={{ 'data-testid': 'phone' }}
                type="tel"
                label="Phone Number"
                value={search ? currentSearch?.phone : filteredRecord?.phone}
                {...(isEmpty('phone', filteredRecord?.phone) ||
                  validatePhoneNo(search ? currentSearch?.phone : filteredRecord?.phone) || {
                    helperText: 'Phone# should be in this format (123)-456-7890',
                  })}
                onChange={(phone: string) => updateCurrent({ phone })}
              />
              {!search && (
                <>
                  <CustomField
                    inputProps={{ 'data-testid': 'street_no' }}
                    label="Street Number"
                    value={filteredRecord?.address?.addressStreet?.streetNumber ?? ''}
                    onChange={(streetNumber) =>
                      updateAddressField('addressStreet', { streetNumber })
                    }
                  />
                  <CustomField
                    inputProps={{ 'data-testid': 'street_name' }}
                    label="Street Name"
                    value={filteredRecord?.address?.addressStreet?.streetName ?? ''}
                    onChange={(streetName) => updateAddressField('addressStreet', { streetName })}
                  />
                </>
              )}
              <AutocompleteField
                label="State"
                options={STATES}
                value={
                  search
                    ? currentSearch?.address?.addressLocation?.state
                    : filteredRecord?.address?.addressLocation?.state
                }
                onChange={(state) =>
                  updateAddressField('addressLocation', { state: state as State, city: undefined })
                }
              />
              {Boolean(
                currentSearch?.address?.addressLocation?.state ||
                  filteredRecord?.address?.addressLocation?.state
              ) && (
                <AutocompleteField
                  label="City"
                  options={fetchCities()}
                  value={displayCity()}
                  onChange={(city) => updateAddressField('addressLocation', { city: city as City })}
                />
              )}
              <CustomField
                inputProps={{ 'data-testid': 'zipcode' }}
                label="Zipcode"
                value={
                  search
                    ? currentSearch?.address?.addressLocation?.zipCode
                    : filteredRecord?.address?.addressLocation?.zipCode
                }
                {...validateZipCode(
                  search
                    ? currentSearch?.address?.addressLocation?.zipCode
                    : filteredRecord?.address?.addressLocation?.zipCode
                )}
                onChange={(zipCode: string) => updateAddressField('addressLocation', { zipCode })}
              />
            </Columns>
          </FormControl>
          {!search && (
            <>
              <Divider />
              <FormControl variant="standard">
                <FormLabel id="hotel-stay">Extras</FormLabel>
                <AutocompleteField
                  options={EXTRAS.filter((extra) => !filteredRecord?.extras?.includes(extra))}
                  value={filteredRecord?.extras}
                  onChange={(newExtras) => {
                    updateCurrent({
                      extras: newExtras as Extras[],
                    })
                  }}
                />
              </FormControl>
              <FormControl variant="standard">
                <FormLabel id="hotel-stay">Pay by</FormLabel>
                <Box display="flex" gap={1} margin={2}>
                  {PAYMENT.map((payBy, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          data-testid="pay_by"
                          size="small"
                          checked={filteredRecord?.payment === payBy}
                          onChange={(...[, checked]) => {
                            updateCurrent({ payment: checked ? payBy : undefined })
                          }}
                        />
                      }
                      label={payBy}
                      labelPlacement="start"
                    />
                  ))}
                </Box>
              </FormControl>
              <FormControl variant="standard">
                <FormLabel id="hotel-stay">Personal Note</FormLabel>
                <CustomField
                  inputProps={{ 'data-testid': 'note' }}
                  multiline
                  rows={3}
                  value={filteredRecord?.note}
                  onChange={(note) => updateCurrent({ note })}
                />
              </FormControl>
              <FormControl variant="standard" sx={{ marginY: 2 }}>
                <FormLabel id="hotel-stay">Tags</FormLabel>
                <AutocompleteField
                  options={[]}
                  value={filteredRecord?.tags}
                  onChange={(newTag) =>
                    updateCurrent({
                      tags: newTag as string[],
                    })
                  }
                />
              </FormControl>
              <Divider />
              <FormControl variant="standard" sx={{ gap: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                    data-testid="reminder"
                      size="small"
                      checked={Boolean(filteredRecord?.reminder)}
                      onChange={(...[, checked]) => updateCurrent({ reminder: checked })}
                    />
                  }
                  label="Send me a reminder"
                />
                <FormControlLabel
                  control={
                    <Switch
                      data-testid="newsletter"
                      size="small"
                      checked={Boolean(filteredRecord?.newsletter)}
                      onChange={(...[, checked]) => updateCurrent({ newsletter: checked })}
                    />
                  }
                  label="Subscribe to newsletter"
                />
                <FormControlLabel
                  control={
                    <Switch
                      data-testid="confirm"
                      size="small"
                      checked={Boolean(filteredRecord?.confirm)}
                      onChange={(...[, checked]) => updateCurrent({ confirm: checked })}
                    />
                  }
                  label="I confirm the information given above"
                />
              </FormControl>
            </>
          )}
        </FormGroup>
        {search && (
          <Button
            data-testid="search-button"
            size="small"
            variant="contained"
            onClick={() => {
              setSearch(currentSearch!)
            }}
            disabled={!currentSearch}
          >
            Search
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Reservation
