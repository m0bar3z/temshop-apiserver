const Controller = require(`${config.path.controllers.seller}/Controller`)
const TAG = 'v1_Proudct'

module.exports = new class ProductController extends Controller {

    async addProduct(req, res) {
        try {
            req.checkBody('productId', 'please enter productId').notEmpty()
            req.checkBody('productId', 'productId must be string').isString()
            req.checkBody('newPrice', 'please enter newPrice').notEmpty()
            req.checkBody('newPrice', 'newPrice must be numeric').isNumeric()
            req.checkBody('newPrice', 'newPrice must be an integer number').isInt({ gt: 0, lt: 2147483647 });
            if(this.showValidationErrors(req, res)) return; 
            
            let result = this.isValidObjectId(req.body.productId)
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
            result = user.shop.find(item => item.product.valueOf() === req.body.productId)
            if(result)
                return res.json({
                    success: false,
                    message: 'this product has been added'
                })
            
            let params = {
                product: this.toObjectId(req.body.productId),
                newPrice: parseInt(req.body.newPrice)
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

    async removeProduct(req, res) {
        try {
            req.checkParams('id', 'product id is not valid').isLength({ min: 24, max: 24});
            if(this.showValidationErrors(req, res)) return; 
            
            let result = this.isValidObjectId(req.params.id)
            if(!result)
                return res.json({
                    success: false,
                    message: 'product is not available'
                })

            result = await this.model.Seller.findOne(
                { _id: req.decodedUser.userId },
                { shop: {
                    $elemMatch: {
                        product: this.toObjectId(req.params.id)
                    }
                }}
            )
              
            if(!result.shop.length)
                return res.json({
                    success: false,
                    message: "product is not found"
                })

            await this.model.Seller.updateOne(
                { _id: req.decodedUser.userId },
                { $pull: { shop: { product: this.toObjectId(req.params.id) }}},
                { multi: true }
            )

            await this.model.Product.updateOne(
                { _id: req.params.id },
                { $pull: { seller: { _id: req.decodedUser.userId } } },
            )
            
            return res.json({
                success: true,
                message: 'product removed from store'
            })
        }
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('removeProduct')
                .inputParams(req.params)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async getProductList(req, res) {
        try {
            let result = await this.model.Seller.findOne({ _id: req.decodedUser.userId }, { shop: 1 })

            if(!result.shop.length) 
                return res.json({
                    success: true,
                    message: 'empty product list!',
                    data: {
                        product: []
                    }
                })

            let ids = result.shop.map(item => item.product)

            let data = await this.model.Product.find(
                { _id: { $in: ids }, active: true }, 
                { name: 1, images: 1, price: 1 }
            )

            data = data.map(item => {
                result.shop.find(obj => {
                    if(obj.product.valueOf() == item._id.valueOf()) {
                        item._doc = { ...item._doc, newPrice: obj.newPrice }
                        return true
                    }
                })
                return item
            })

            return res.json({
                success: true,
                message: 'active product list is ready',
                data
            })    
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getProductList')
                .call()
            
            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async editProductPrice(req, res) {
        try {
            req.checkParams('id', 'product id is not valid').isLength({ min: 24, max: 24});
            req.checkParams('newPrice', 'price is not valid').isInt({ gte: 0, lt: 2147483647 });
            req.checkParams('newPrice', 'price length is not valid').isLength({ min: 4, max: 6 })
            if(this.showValidationErrors(req, res)) return; 

            let result = this.isValidObjectId(req.params.id)
            if(!result)
                return res.json({
                    success: false,
                    message: 'product is not available'
                })

            let owningProduct = await this.model.Seller.findOne({ 
                _id: req.decodedUser.userId, 
                "shop.product": this.toObjectId(req.params.id)
            })

            if(!owningProduct)
                return res.json({
                    success: false,
                    message: "product is not found!"
                })

            await this.model.Seller.updateOne(
                { _id: req.decodedUser.userId, "shop.product": this.toObjectId(req.params.id) },
                { 
                    $set: {
                        "shop.$.newPrice": parseInt(req.params.newPrice)
                    }
                }
            )
            return res.json({
                success: true,
                message: "product price is modified"
            })    
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editNewPrice')
                .inputParams(req.params)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}