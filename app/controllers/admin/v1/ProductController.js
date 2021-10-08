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
            res.json({
                message: "add product api"
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
            let handleError = this.transforms.ErrorTransform(error)
            .parent(this.controllerTag)
            .class(TAG)
            .method('deleteProduct')
            .inputParams(req.body)
            .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}