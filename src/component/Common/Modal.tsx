import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import React from 'react'
import { HotelReservation } from '../../types/model'

type Props = {
  open: boolean
  page: string
  setOpen: (open: boolean) => void
  setRecords: (records: HotelReservation[]) => void
  children: React.ReactNode
}

const OpenModal: React.FC<Props> = ({ open, page, setOpen, setRecords, children }) => {
  const handleSave = () => {}

  const handleDiscard = () => {}

  return (
    <Dialog
      maxWidth="xl"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="open-detail-reservation-page"
    >
      <DialogTitle>{page}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleDiscard}>Discard</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default OpenModal
