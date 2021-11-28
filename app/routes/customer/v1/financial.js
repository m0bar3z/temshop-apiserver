const express = require('express')
const router = express.Router()

const FinancialController = require(`${config.path.controllers.customer}/v1/FinancialController`)

/**
 * @api {post} /api/customer/v1/payment AddNewPayment
 * @apiVersion 1.0.0
 * @apiName addPayment
 * @apiDescription add new payment
 * @apiGroup Customer
 * @apiSuccessExample {json} Success-Response :
 * {
 *  success: true,
 *  message: "new payment successfully created",
 *  data: {
 *      orderId: "TEM-12345",
 *      link: "https://idpay.ir/payment"
 *  }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *  success: false,
 *  message: "cart is empty!"
 * } 
*/
router.post('/payment', FinancialController.addPayment.bind(FinancialController))


/**
 * @api {post} /api/customer/v1/payment/verify/:orderId VerifyPayment
 * @apiVersion 1.0.0
 * @apiName verifyPayment
 * @apiDescription verify customer payment
 * @apiGroup Customer
 * @apiParam {varchar} orderId orderId
 * @apiSuccessExample {json} Success-Response :
 * {
 *  success: true,
 *  message: "payment is verified successfully",
 *  data: idPayResponse
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *  success: false,
 *  message: "امکان تایید پرداخت وجود ندارد"
 * } 
*/
router.post('/payment/verify/:orderId', FinancialController.verifyPayment.bind(FinancialController))


/**
 * @api {put} /api/customer/v1/payment/reset/:orderId ResetPayment
 * @apiVersion 1.0.0
 * @apiName resetPayment
 * @apiDescription reset customer payment and return new payment link
 * @apiGroup Customer
 * @apiParam {varchar} orderId orderId
 * @apiSuccessExample {json} Success-Response :
 * {
 *  success: true,
 *  message: "reset the payment,
 *  data: {
 *      orderId: "TEM-12345",
 *      link: "https://idpay.ir/payment"
 *  }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *  success: false,
 *  message: "payment has been verified!"
 * } 
*/
router.put('/payment/reset/:orderId', FinancialController.resetPayment.bind(FinancialController))

module.exports = router