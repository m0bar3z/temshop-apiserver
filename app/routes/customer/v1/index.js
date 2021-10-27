const express = require('express')
const router = express.Router()

const home = require('./home')
const cart = require('./cart')

router.use('/', home)
router.use('/cart', cart)

module.exports = router