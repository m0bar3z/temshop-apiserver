const express = require('express')
const router = express.Router()

const { admin : adminController } = config.path.controllers
const HomeController = require(`${adminController}/v1/HomeController`)

/**
  * @api {post} /api/admin/v1/login Login
  * @apiVersion 1.0.0
  * @apiName login
  * @apiDescription login api for admin
  * @apiGroup Admin
  * @apiParam  {varchar} username username
  * @apiParam  {varchar} password password
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success: true,
  *     message: "logged in successfully",
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
router.post('/login', HomeController.login.bind(HomeController) )


module.exports = router