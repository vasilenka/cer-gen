const express = require('express')
const router = express.Router()
let data = require('./../participants/participants')

router.get('/', function(req, res, next) {
  res.json({hi: 'https://herlambang.id'})
})

module.exports = router
