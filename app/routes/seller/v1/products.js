const express = require('express')
const router = express.Router()

const { seller: sellerController } = config.path.controllers
const ProductController = require(`${sellerController}/v1/ProductController`)

/**
  * @api {post} /api/seller/v1/products AddProduct
  * @apiVersion 1.0.0
  * @apiName addProduct
  * @apiDescription add product to store page
  * @apiGroup Seller
  * @apiParam  {varchar} productId product objectId from database
  * @apiParam  {varchar} newPrice  new price for seller's store page
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "product added to store page"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "product not found"
  * }
*/
router.post('/', ProductController.addProduct.bind(ProductController))


/**
  * @api {delete} /api/seller/v1/products/:id DeleteProduct
  * @apiVersion 1.0.0
  * @apiName deleteProduct
  * @apiDescription delete product frome store page
  * @apiGroup Seller
  * @apiParam  {varchar} id product objectId from database
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "product removed from store"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "product is not found"
  * }
*/
router.delete('/:id', ProductController.removeProduct.bind(ProductController))

module.exports = router