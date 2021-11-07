const express = require('express')
const router = express.Router()

const FinancialController = require(`${config.path.controllers.customer}/v1/FinancialController`)

router.post('/payment', FinancialController.addPayment.bind(FinancialController))

module.exports = router