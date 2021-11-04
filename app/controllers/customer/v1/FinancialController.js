const Controller = require(`${config.path.controllers.customer}/Controller`)
const TAG = 'V1_Financial'

module.exports = new class FinancialController extends Controller {
    async addPayment(req, res) {
        try {
            res.json({
                message: 'add new payment for customer'
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
}