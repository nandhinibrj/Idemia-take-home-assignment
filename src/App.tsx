import React from 'react'
import './App.css'
import { Typography } from '@mui/material'
import Main from './pages/main'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" padding={1.5}>
          Hotel Reservation System
        </Typography>
      </header>
      <section>
        <Main />
      </section>
    </div>
  )
}

export default App
