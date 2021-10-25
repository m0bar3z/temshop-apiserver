const express = require('express')
const router = express.Router()

const { seller: sellerController } = config.path.controllers
const FinancialController = require(`${sellerController}/v1/FinancialController`)

router.get('/card', FinancialController.getCard.bind(FinancialController))

router.post('/card', FinancialController.addCard.bind(FinancialController))

router.put('/card/:num', FinancialController.editCard.bind(FinancialController))

router.delete('/card', FinancialController.removeCard.bind(FinancialController))

module.exports = router