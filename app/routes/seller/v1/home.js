const express = require('express')
const router = express.Router()

//controllers
const { seller: sellerController } = config.path.controllers
const HomeController = require(`${sellerController}/v1/HomeController`)

router.post('/', HomeController.register.bind(HomeController))

router.post('/login', HomeController.login.bind(HomeController))

module.exports = router