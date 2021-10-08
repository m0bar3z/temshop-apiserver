const express = require('express')
const router = express.Router()

const home = require('./home')
const product = require('./product')

router.use('/', home)
router.use('/products', product)

module.exports = router