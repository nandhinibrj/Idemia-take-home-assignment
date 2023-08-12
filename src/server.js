const express = require('express')
const cors = require('cors')
const port = 8000
const allowedOrigins = ['http://localhost:3000']
var corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
}

const app = express()
app.use(cors(corsOptions))

const jsonData = require('../public/reservations.json')

app.get('/api/get_records', (req, res) => {
    res.json(jsonData)
})

app.listen(port, () => {
  console.log(`now listening on port ${port}`)
})
