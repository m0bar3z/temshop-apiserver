const express = require('express')
const router = express.Router()

const { admin : adminController } = config.path.controllers
const ProductController = require(`${adminController}/v1/ProductController`)

router.get('/', ProductController.getProduct.bind(ProductController))

router.post('/', ProductController.addProduct.bind(ProductController))

router.put('/:id', ProductController.editProduct.bind(ProductController))

router.delete('/:id', ProductController.deleteProduct.bind(ProductController))

module.exports = router