const Controller = require(`${config.path.controllers.customer}/Controller`)
const TAG = 'V1_Financial'
const axios = require('axios').default
const crypto = require('crypto')

module.exports = new class FinancialController extends Controller {
    async addPayment(req, res) {
        try {
            let id = 'TEM-'.concat(crypto.randomBytes(4).toString('hex'))
            
            let customer = await this.model.Customer.findOne(
                { _id: req.decodedUser.userId }, 
                { cart: 1, mobile: 1 }
            )
            
            if(!customer.cart.length)
                return res.json({
                    success: false,
                    message: "cart is emply!"
                })
            
            let totalPrice = customer.cart.reduce((accumulator, value) => {
                return accumulator += value.maxPrice
            }, 0)
            
            let body = {
                order_id: id,
                amount: totalPrice,	
                phone: customer.mobile,
                callback: "https://www.google.com"
            }  

            let response = await axios.post('https://api.idpay.ir/v1.1/payment',JSON.stringify(body) , { headers: config.idPayHeaders } )
           
            await this.model.Customer.updateOne(
                { _id: req.decodedUser.userId },

                { $addToSet: { "payment": {
                    addPaymentRes: response.data,
                    verifyPaymentRes: {},
                    orderId: id
                }}}
            )

            let order = {
                delivered: false, 
                orderId: id,
                isPaid: false, 
                product: "",
                customer: req.decodedUser.userId,
                seller: "",
                quantity: 1,
                maxPrice: 0
            }
            
            for(const element of customer.cart) {
                order.product = element.product
                order.seller = element.seller
                order.quantity = element.quantity
                order.maxPrice = element.maxPrice
                await this.model.Order.create(order)
            }

            await this.model.Customer.updateOne(
                { _id: req.decodedUser.userId },
                { $pull: { cart: {}}},
                { multi: true }
            )

            //return res.redirect(response.data.link)
            return res.json({
                success: true,
                message: "new payment successfully created",
                data: {
                    orderId: id,
                    link: response.data.link
                }
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addPayment')
                .inputParams(req.body)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async verifyPayment(req, res) {
        try {
            req.checkParams('orderId', 'orderId length must be 12').isLength({ min: 12, max: 12 })
            if(this.showValidationErrors(req, res)) return

            let customer = await this.model.Customer.findOne(
                { _id: req.decodedUser.userId },
                { payment: { $elemMatch: {orderId: req.params.orderId} }}   
            )

            // if(customer.payment.length === 1) 
            //     return res.json({
            //         success: false,
            //         message: "nothing found!"
            //     })

            let body = {
                id: customer.payment[0].addPaymentRes.id,
                order_id: customer.payment[0].orderId
            }

            let body2 = {
                id: "19b61a039899196f7e4ca06e536549b5",
                order_id: "1234"
            }
            
            let idPayResponse = {}

            await axios.post('https://api.idpay.ir/v1.1/payment/verify',JSON.stringify(body) , { headers: config.idPayHeaders })
                .then(response => {
                    idPayResponse = response.data
                })
                .catch(error => {
                    return res.json({
                        success: false,
                        message: error.message
                    })
                })  

            if(idPayResponse.status === 100) {
                await this.model.Customer.updateOne(
                    { _id: req.decodedUser.userId, "payment.orderId": req.params.orderId },
                    { $set: { "payment.$.verifyPaymentRes": idPayResponse }}
                )

                await this.model.Order.updateMany(
                    { orderId: req.params.orderId },
                    { $set: { "isPaid": true } }
                )

                return res.json({
                    success: true,
                    message: "payment is verified successfully",
                    data: idPayResponse
                })
            }

            if(idPayResponse.status === 101)
                return res.json({
                    success: true,
                    message: "payment has been verified!"
                })

        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('verifyPayment')
                .inputParams(req.body)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async resetPayment(req, res) {
        try {
            req.checkParams('orderId', 'orderId length must be 12').isLength({ min: 12, max: 12 })
            if(this.showValidationErrors(req, res)) return

            let customer = await this.model.Customer.findOne(
                { _id: req.decodedUser.userId},
                { payment: { $elemMatch: {  orderId: req.params.orderId }}, mobile: 1}
            )

            if(customer.payment[0].verifyPaymentRes.status)
                return res.json({
                    success: false,
                    message: "payment has been verified!"
                })

            let orders = await this.model.Order.find({ orderId: req.params.orderId }, { maxPrice:1 })

            let totalPrice = orders.reduce((accumulator, order) => {
                return accumulator += order.maxPrice
            }, 0)
            
            let body = {
                order_id: req.params.orderId,
                amount: totalPrice,	
                phone: customer.mobile,
                callback: "https://www.google.com"
            }  

            let response = await axios.post('https://api.idpay.ir/v1.1/payment',
                JSON.stringify(body) , 
                { headers: config.idPayHeaders } 
            )
            response = response.data
            
            await this.model.Customer.updateOne(
                { _id: req.decodedUser.userId, "payment.orderId": req.params.orderId },
                { $set: { "payment.$.addPaymentRes": response } }     
            )


            return res.json({
                success: true,
                message: "reset the payment",
                response: response.data
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('resetPayment')
                .inputParams(req.params)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}