const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


app.use(bodyParser.json())

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1', articleRoutes)

module.exports = app
