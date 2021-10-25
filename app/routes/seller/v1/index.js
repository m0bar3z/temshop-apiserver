const express = require('express')
const router = express.Router()

const home = require('./home')
const products = require('./products')
const financial = require('./financial')

router.use('/', home)
router.use('/products', products)
router.use('/financial', financial)

module.exports = router