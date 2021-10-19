const express = require('express')
const router = express.Router()

//controllers
const { seller: sellerController } = config.path.controllers
const HomeController = require(`${sellerController}/v1/HomeController`)

/**
  * @api {post} /api/seller/v1 Register
  * @apiVersion 1.0.0
  * @apiName register
  * @apiDescription register new seller
  * @apiGroup Seller
  * @apiParam  {varchar} username username
  * @apiParam  {varchar} password password
  * @apiParam  {varchar} mobile phone number
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success: true,
  *     message: "registered successfully"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *      success: false,
  *      message: "username or mobile is taken!"
  * }
  */
router.post('/', HomeController.register.bind(HomeController))


/**
  * @api {post} /api/seller/v1/login Login
  * @apiVersion 1.0.0
  * @apiName login
  * @apiDescription login api for seller
  * @apiGroup Seller
  * @apiParam  {varchar} username username
  * @apiParam  {varchar} password password
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success: true,
  *     message: "Logged in successfully",
  *     data: {
  *          idToken: idToken, 
  *          accessToken: accessToken
  *     }
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *      success: false,
  *      message: "username not found"
  * }
  */
router.post('/login', HomeController.login.bind(HomeController))

module.exports = router