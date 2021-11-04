const express = require('express')
const router = express.Router()

const home = require('./home')
const cart = require('./cart')
const financial = require('./financial')

router.use('/', home)
router.use('/cart', cart)
router.use('/financial', financial)

module.exports = router