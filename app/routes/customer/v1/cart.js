const express = require('express')
const router = express.Router()

const CartController = require(`${config.path.controllers.customer}/v1/CartController`)

router.post('/', CartController.addToCart.bind(CartController))

module.exports = router