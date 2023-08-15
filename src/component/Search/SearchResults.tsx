import { Add, AlternateEmail, Call, Close, Delete } from '@mui/icons-material'
import React from 'react'
import { HotelReservation, Page } from '../../types/model'
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridColumnGroupingModel,
} from '@mui/x-data-grid'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import Reservation from './Reservation'
import { DEFAULT_VALUES } from '../../utils/const'

type Props = {
  records: HotelReservation[]
  setRecords: (records: HotelReservation[]) => void
}

const SearchResults: React.FC<Props> = ({ records, setRecords }) => {
  const [page, setPage] = React.useState<Page>()
  const [open, setOpen] = React.useState<boolean>(false)
  const [filteredRecord, setFilteredRecord] = React.useState<HotelReservation>()

  const handleDelete = (id: number) => {
    setRecords(records.length > 1 ? [...records.slice(0, id - 1), ...records.slice(id)] : [])
  }

  const renderDelete = ({ id }: GridCellParams<HotelReservation>) => (
    <Button
      size="small"
      variant="outlined"
      startIcon={<Delete />}
      onClick={() => handleDelete(id as number)}
    >
      Delete
    </Button>
  )

  const renderExtras = ({ row }: GridCellParams<HotelReservation>) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingY: 1 }}>
      {row?.extras?.map((extra, index) => (
        <Typography key={index} variant="body2">
          {index + 1}. {extra}
        </Typography>
      ))}
    </Box>
  )
  const renderAddress = ({ row }: GridCellParams<HotelReservation>) => (
    <Box display="flex" flexDirection="column">
      <span>
        {row?.address?.addressStreet?.streetNumber}, {row?.address?.addressStreet?.streetName}
      </span>
      <span>
        {row?.address?.addressLocation?.city}, {row?.address?.addressLocation?.state},
        {row?.address?.addressLocation?.zipCode}.
      </span>
    </Box>
  )
  const renderContact = ({ row }: GridCellParams<HotelReservation>) => (
    <Box display="flex" flexDirection="column">
      <Box sx={{ display: 'flex', textAlign: 'center', gap: 1 }}>
        <AlternateEmail fontSize="small" />
        <Link
          href={`mailto:${row?.email}`}
          variant="body2"
          color="secondary"
          target="_blank"
          onClick={(event) => event.stopPropagation()}
        >
          {row?.email}
        </Link>
      </Box>
      <Box sx={{ display: 'flex', textAlign: 'center', gap: 1 }}>
        <Call fontSize="small" />
        <Link
          href={`tel:${row?.phone}`}
          variant="body2"
          color="secondary"
          target="_blank"
          onClick={(event) => event.stopPropagation()}
        >
          {row?.phone}
        </Link>
      </Box>
    </Box>
  )
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
      headerClassName: 'sticky-left',
      cellClassName: 'sticky-left',
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: ({ row }: GridCellParams<HotelReservation>) => (
        <Typography variant="body2">{row.firstName + ' ' + row.lastName}</Typography>
      ),
    },
    {
      field: 'arrivalDate',
      headerName: 'Arrival Date',
      width: 150,
      type: 'dateTime',
      renderCell: ({ row }: GridCellParams<HotelReservation>) => (
        <Typography variant="body2">{row.stay?.arrivalDate}</Typography>
      ),
    },
    {
      field: 'departureDate',
      headerName: 'Departure Date',
      width: 150,
      type: 'dateTime',
      renderCell: ({ row }: GridCellParams<HotelReservation>) => (
        <Typography variant="body2">{row.stay?.departureDate}</Typography>
      ),
    },
    {
      field: 'roomSize',
      headerName: 'Room Size',
      width: 150,
      renderCell: ({ row }: GridCellParams<HotelReservation>) => (
        <Typography variant="body2">{row.room?.roomSize}</Typography>
      ),
    },
    {
      field: 'roomQuantity',
      headerName: 'Room Quantity',
      width: 150,
      renderCell: ({ row }: GridCellParams<HotelReservation>) => (
        <Typography variant="body2">{row.room?.roomQuantity}</Typography>
      ),
    },
    {
      field: 'contact',
      headerName: 'Email & Phone',
      width: 200,
      renderCell: renderContact,
    },
    {
      field: 'address',
      headerName: 'Address',
      width: 200,
      renderCell: renderAddress,
    },
    {
      field: 'extras',
      headerName: 'Extras',
      width: 200,
      renderCell: renderExtras,
    },
    {
      field: 'payment',
      headerName: 'Pay by',
      width: 200,
    },
    {
      field: 'delete',
      headerName: "Action",
      cellClassName: 'sticky-right',
      sortable: false,
      width: 200,
      renderCell: renderDelete,
    },
  ]

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: 'stay',
      headerName: 'Stay',
      children: [{ field: 'arrivalDate' }, { field: 'departureDate' }],
    },
    {
      groupId: 'room',
      headerName: 'Room',
      children: [{ field: 'roomSize' }, { field: 'roomQuantity' }],
    },
    {
      groupId: 'user_contact',
      headerName: 'Contact',
      children: [{ field: 'contact' }, { field: 'address' }],
    },
  ]

  const handleUpdate = (record_id: number) => {
    const filtered_record: HotelReservation = records.filter(({ id }) => id === record_id)[0]
    setPage('Update')
    setFilteredRecord(filtered_record)
    setOpen(true)
  }

  const handleSave = () => {
    filteredRecord &&
      (page === 'Update'
        ? setRecords([
            ...records.slice(0, filteredRecord.id - 1),
            { ...filteredRecord },
            ...records.slice(filteredRecord.id),
          ])
        : setRecords([...records, filteredRecord]))
    setOpen(false)
  }

  const handleDiscard = () => {
    setRecords([...records])
    setOpen(false)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      alignItems="flex-start"
      alignContent="center"
    >
      <Button
        size="small"
        variant="outlined"
        startIcon={<Add />}
        onClick={() => {
          setPage('Add')
          setFilteredRecord({ id: records.length + 1, ...DEFAULT_VALUES } as HotelReservation)
          setOpen(true)
        }}
      >
        Add New Record
      </Button>
      {records && (
        <Box sx={{ width: '100%', display: 'grid' }}>
          <DataGrid
            data-testid="result-table"
            autoHeight
            sx={{
              '& .MuiDataGrid-root .MuiDataGrid-cellContent': {
                whiteSpace: 'normal !important',
                wordWrap: 'break-word !important',
              },
              '& .sticky-left': {
                position: 'sticky',
                left: 0,
                zIndex: (theme) => theme.zIndex.mobileStepper,
                background: (theme) => theme.palette.background.paper,
              },
              '& .sticky-right': {
                position: 'sticky',
                right: 0,
                zIndex: (theme) => theme.zIndex.mobileStepper,
                background: (theme) => theme.palette.background.paper,
              },
            }}
            experimentalFeatures={{ columnGrouping: true }}
            columns={columns}
            columnGroupingModel={columnGroupingModel}
            rows={records ?? []}
            loading={!records}
            rowCount={records.length}
            onRowSelectionModelChange={(row) => {
              handleUpdate(row[0] as number)
            }}
            getRowHeight={() => 'auto'}
          />
        </Box>
      )}
      {filteredRecord && (
        <Dialog
          maxWidth="xl"
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="open-detail-reservation-page"
        >
          <DialogTitle>
            <Box display="flex" justifyContent="space-between" alignContent="center">
              <Typography variant="subtitle2">{page}</Typography>
              <IconButton size="small" onClick={() => handleDiscard()}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Reservation
              search={false}
              filteredRecord={filteredRecord}
              setFilteredRecord={setFilteredRecord}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDiscard}>Discard</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  )
}

export default React.memo(SearchResults)
