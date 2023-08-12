import { Box } from '@mui/material'
import React from 'react'

type Props = {
  columns: number
  children: React.ReactNode
}
const Columns: React.FC<Props> = ({ columns, children }) => (
  <Box display="grid" gridTemplateColumns={`repeat(${columns}, 0.2fr)`} gridTemplateRows="auto">
    {children}
  </Box>
)

export default Columns
