const express = require('express')
// const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/home'))
app.use('/pdf', require('./routes/pdf'))
app.use('/participants', require('./routes/participant'))

module.exports = app
