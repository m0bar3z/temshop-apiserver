const express = require('express')
const router = express.Router()

const { admin : adminController } = config.path.controllers
const ProductController = require(`${adminController}/v1/ProductController`)

router.get('/', ProductController.getProduct.bind(ProductController))

/**
  * @api {post} /api/admin/v1/products AddProduct
  * @apiVersion 1.0.0
  * @apiName AddProduct
  * @apiDescription add product api for admin
  * @apiGroup Admin
  * @apiParam  {varchar} name product name
  * @apiParam  {varchar} price product price
  * @apiParam  {file[]} image product images should be png/jpeg and 
  * maximum number of product photos is 4 
  * @apiSuccessExample {json} Success-Response:
  * {
  *     success: true,
  *     message: "new product added"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *      success: false,
  *      message: "invalid file(s)!"
  * }
  */
router.post('/', ProductController.addProduct.bind(ProductController))

router.put('/:id', ProductController.editProduct.bind(ProductController))

router.delete('/:id', ProductController.deleteProduct.bind(ProductController))

module.exports = router