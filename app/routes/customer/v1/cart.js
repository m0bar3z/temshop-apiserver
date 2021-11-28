const express = require('express')
const router = express.Router()

const CartController = require(`${config.path.controllers.customer}/v1/CartController`)


/**
 * @api {post} /api/customer/v1/cart AddToCart
 * @apiVersion 1.0.0
 * @apiName addToCart
 * @apiDescription add new product to cart
 * @apiGroup Customer
 * @apiParam {varchar} productId ObjectId of product
 * @apiParam {varchar} quantity quantity of product must be between 1 and 5
 * @apiParam {varchar} seller seller's username
 * @apiSuccessExample {json} Success-Response :
 * {
 *  success: true,
 *  message: "product added to cart",
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *  success: false,
 *  message: "total product quantity is more than 5!"
 * } 
*/
router.post('/', CartController.addToCart.bind(CartController))

module.exports = router