const Controller = require(`${config.path.controllers.admin}/Controller`)
const TAG = 'v1_Product'

module.exports = new class ProductController extends Controller {

    async getProduct(req, res) {
        try {
            return res.json({
                message: "get products list for admin panel"
            })

        } catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
            .parent(this.controllerTag)
            .class(TAG)
            .method('getProduct')
            .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async addProduct(req, res) {
        try {
            req.checkBody('name' ,'please enter product name').notEmpty()
            req.checkBody('name', 'product name is too short or too long').isLength({ min: 4, max: 20});
            req.checkBody('price' ,'please enter product price').notEmpty()
            req.checkBody('price', 'product price should be numeric value').isInt({ gte: 0, lt: 2147483647 });
            if(this.showValidationErrors(req, res)) return;
            
            if(!req.files.length)
                return res.json({
                    success: false,
                    message: "invalid file(s)!"
                })
                

            let params = {
                name: req.body.name,
                price: parseInt(req.body.price),
                images: []
            }

            req.files.map(file => {
                params.images.push(`http://localhost:3000/${file.path.replace(/\\/g)}`)
            })

            await this.model.Product.create(params)

            return res.json({
                success: true,
                message: "new product added"
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

    async editProduct(req, res) {
        try {
            res.json({
                message: "edit product api"
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
            .parent(this.controllerTag)
            .class(TAG)
            .method('editProduct')
            .inputParams(req.body)
            .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async deleteProduct(req, res) {
        try {
            res.json({
                message: "delete product api"
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
            .parent(this.controllerTag)
            .class(TAG)
            .method('deleteProduct')
            .inputParams(req.body)
            .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}