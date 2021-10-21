const Controller = require(`${config.path.controllers.seller}/Controller`)
const TAG = 'v1_Proudct'
const mongoose = require('mongoose')

module.exports = new class ProductController extends Controller {

    async addProduct(req, res) {
        try {
            req.checkBody('productId', 'please enter productId').notEmpty()
            req.checkBody('productId', 'productId must be string').isString()
            req.checkBody('newPrice', 'please enter newPrice').notEmpty()
            req.checkBody('newPrice', 'newPrice must be string').isString()
            req.checkBody('newPrice', 'newPrice should be numeric value').isInt({ gte: 0, lt: 2147483647 });
            if(this.showValidationErrors(req, res)) return; 
            
            let result = mongoose.isValidObjectId(req.body.productId)
            if(!result)
                return res.json({
                    success: false,
                    message: 'productId is invalid'
                })

            let product = await this.model.Product.findOne({ '_id': req.body.productId })
            if(!product || !product.active)
                return res.json({
                    success: false,
                    message: 'product not found'
                })

            let user = await this.model.Seller.findOne({ '_id': req.decodedUser.userId })
            result = user.shop.find(item => item.productId === req.body.productId)
            if(result)
                return res.json({
                    success: false,
                    message: 'this product has been added'
                })
            
            let params = {
                productId: req.body.productId,
                newPrice: req.body.newPrice
            }
            
            let update = { $addToSet: { seller:
                { _id: req.decodedUser.userId }
            }}
            
            await this.model.Product.findOneAndUpdate({ _id: req.body.productId }, update )
            user.shop.push(params)
            await product.save()
            await user.save()

            return res.json({
                success: true,
                message: "product added to store page"
            })

        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addProduct')
                .inputParams(req.body)
                .call()
            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}