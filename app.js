const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./db')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})
app.use(bodyParser.json())

app.get('/', (req, res) => {
  pool.query('SELECT NOW()')
    .then((qRes) => {
      res.status(200).json({ time: qRes.rows[0] })
    })
    .catch((error) => {
      res.status(400).json({ error: error })
    })
})

module.exports = app
