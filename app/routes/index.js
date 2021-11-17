const express = require('express')
const router = express.Router()
const cors = require('cors')

const customer = require('./customer')
const seller = require('./seller')
const admin = require('./admin')

const corsOptions = {
    origin: '*',
    credentials: true,          //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

router.use(cors(corsOptions))

router.use('/customer', customer)
router.use('/seller', seller)
router.use('/admin', admin)

module.exports = router