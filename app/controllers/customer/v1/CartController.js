const TAG = 'V1_Cart'
const Controller = require(`${config.path.controllers.customer}/Controller`)
const mongoose = require('mongoose')

module.exports = new class CartController extends Controller {
    async addToCart(req, res) {
        try {
            req.checkBody('productId', 'please Enter productId').notEmpty()
            req.checkBody('quantity', 'please enter product quantity').notEmpty()
            req.checkBody('quantity', 'product quantity must be string').isString()
            req.checkBody('quantity', 'product quantity must be numeric and less than 10').isInt({ gte: 0, lt: 11 })
            req.checkBody('seller', "please enter seller's username").notEmpty()
            req.checkBody('seller', "seller's username must be string").isString()
            if(this.showValidationErrors(req, res)) return;

            let result = mongoose.isValidObjectId(req.body.productId)
            if(!result) 
                return res.json({
                    success: false,
                    message: 'invalid product id'
                })

            

            return res.json({
                message: 'add to cart api'
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