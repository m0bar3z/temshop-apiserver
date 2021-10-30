const TAG = 'V1_Cart'
const Controller = require(`${config.path.controllers.customer}/Controller`)
const mongoose = require('mongoose')

module.exports = new class CartController extends Controller {
    async addToCart(req, res) {
        try {
            req.checkBody('productId', 'please Enter productId').notEmpty()
            req.checkBody('quantity', 'please enter product quantity').notEmpty()
            req.checkBody('quantity', 'product quantity must be numeric').isNumeric()
            req.checkBody('quantity', 'product quantity must be between 1 and 5').isInt({ min: 1, max: 5})
            req.checkBody('seller', "please enter seller's username").notEmpty()
            req.checkBody('seller', "seller's username must be string").isString()
            if(this.showValidationErrors(req, res)) return;

            let result = mongoose.isValidObjectId(req.body.productId)
            if(!result) 
                return res.json({
                    success: false,
                    message: 'invalid product id'
                })
            
            let customer = await this.model.Customer.findOne(
                { _id: req.decodedUser.userId },
                { cart: 1 }
            )
            
            if(customer.cart.length > 4) 
                return res.json({
                    success: false,
                    message: "cart is full!"
                })

            let seller = await this.model.Seller.findOne(
                { username: req.body.seller }, 
                { shop: 1 } 
            )
            
            if(!seller) 
                return res.json({
                    success: false,
                    message: "seller wasn't found!"
                })
    
            let sellerHasProduct = seller.shop.find(item => item.product === req.body.productId)
            if(!sellerHasProduct) 
                return res.json({
                    success: false,
                    message: "seller doesn't have this product"
                })

            // check product quantity value
            let unacceptableQuantity = customer.cart.find(item => {
                if(
                    item.product.valueOf() === req.body.productId && 
                    item.seller.valueOf() === seller._id.valueOf() &&
                    item.quantity + req.body.quantity > 5
                ) {
                    return true
                }
            })

            if(unacceptableQuantity)
                return res.json({
                    success: false,
                    message: 'total product quantity is more than 5!'
                })
            
            let params = {
                product: mongoose.Types.ObjectId(req.body.productId),
                quantity: req.body.quantity,
            }

            // find product price from seller's document 
            params.seller = seller._id
            seller.shop.find(item => {
                if(item.product.valueOf() === req.body.productId) {
                    params.maxPrice = item.newPrice * params.quantity
                    return true
                } 
            })

            result = await this.model.Customer.updateOne(
                { _id: req.decodedUser.userId, "cart.product": params.product },
                { $inc: { "cart.$.quantity": req.body.quantity, "cart.$.maxPrice": params.maxPrice }}
            )
            
            await this.model.Customer.updateOne(
                { _id: req.decodedUser.userId, "cart.product": { $ne: params.product }},
                { $addToSet: { "cart": params  }}
            )

            return res.json({
                success: true,
                message: 'product added to cart',
            })    
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addToCart')
                .inputParams(req.body)
                .call()
            
            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}