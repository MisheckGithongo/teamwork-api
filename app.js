const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user')
const articleRoutes = require('./routes/article')
const feedRoute = require('./routes/feed')
const gifRoutes = require('./routes/gif')

const app = express()

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader("Access-Control-Allow-Credentials", "true")
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})


app.use(bodyParser.json())

app.use('/', express.static('public'))

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/articles', articleRoutes)
app.use('/api/v1/feed', feedRoute)
app.use('/api/v1/gifs', gifRoutes)

module.exports = app
