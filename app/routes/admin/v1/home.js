const express = require('express')
const router = express.Router()

const { admin : adminController } = config.path.controllers
const HomeController = require(`${adminController}/v1/HomeController`)


router.post('/login', HomeController.login.bind(HomeController) )


module.exports = router