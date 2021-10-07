const express = require('express')
const router = express.Router()

const { customer: customerControlller } = config.path.controllers
const HomeController = require(`${customerControlller}/v1/HomeController`)

router.post('/', HomeController.register.bind(HomeController))

router.post('/login', HomeController.login.bind(HomeController))

module.exports = router