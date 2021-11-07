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

            let headers = {
                "x-api-key": "6a7f99eb-7c20-4412-a972-6dfb7cd253a4",
                "x-sandbox": true,
                "content-type": "application/json"
            }  

            let response = await axios.post('https://api.idpay.ir/v1.1/payment',JSON.stringify(body) , { headers })
            

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

            return res.redirect(response.data.link)
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
}