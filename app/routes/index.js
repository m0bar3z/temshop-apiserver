const express = require('express')
const router = express.Router()

const customer = require('./customer')
const seller = require('./seller')
const admin = require('./admin')

router.use('/customer', customer)
router.use('/seller', seller)
router.use('/admin', admin)

module.exports = router