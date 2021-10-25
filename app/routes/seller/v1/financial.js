const express = require('express')
const router = express.Router()

const { seller: sellerController } = config.path.controllers
const FinancialController = require(`${sellerController}/v1/FinancialController`)


/**
  * @api {get} /api/seller/v1/financial/card GetCardNumber
  * @apiVersion 1.0.0
  * @apiName getCardNumber
  * @apiDescription get seller's card number
  * @apiGroup Seller
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "card number is found!",
  *   data: {
  *     _id: "123456789",
  *     bankId: "123456789"  
  *   }
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "card number field is empty"
  * }
*/
router.get('/card', FinancialController.getCard.bind(FinancialController))

/**
  * @api {post} /api/seller/v1/financial/card AddCardNumber
  * @apiVersion 1.0.0
  * @apiName addCardNumber
  * @apiDescription add seller's card number
  * @apiGroup Seller
  * @apiParam  {varchar} cardNum seller card number
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "card number added successfully!"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "card number has been added!"
  * }
*/
router.post('/card', FinancialController.addCard.bind(FinancialController))


/**
  * @api {put} /api/seller/v1/financial/card/:num EditCardNumber
  * @apiVersion 1.0.0
  * @apiName editCardNumber
  * @apiDescription edit seller's card number
  * @apiGroup Seller
  * @apiParam  {varchar} num seller card number
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "card number edited"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "card number field is empty!"
  * }
*/
router.put('/card/:num', FinancialController.editCard.bind(FinancialController))

/**
  * @api {delete} /api/seller/v1/financial/card DeleteCardNumber
  * @apiVersion 1.0.0
  * @apiName deleteCardNumber
  * @apiDescription delete seller's card number
  * @apiGroup Seller
  * @apiSuccessExample {json} Success-Response:
  * {
  *   success: true,
  *   message: "card number removed!"
  * }
  * @apiErrorExample {json} Error-Response:
  * {
  *   success: false,
  *   message: "card number field is empty!"
  * }
*/
router.delete('/card', FinancialController.removeCard.bind(FinancialController))

module.exports = router