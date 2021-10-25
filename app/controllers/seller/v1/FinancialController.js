const Controller = require(`${config.path.controllers.seller}/Controller`)
const TAG = 'V1_Financial'

module.exports = new class FinancialController extends Controller {
    
    async getCard(req, res) {
        try {
            let result = await this.model.Seller.findOne(
                { _id: req.decodedUser.userId }, 
                { bankId: 1 }
            )
            if(!result.bankId.length)
                return res.json({
                    success: false,
                    message: "card number field is empty!"
                })
            
            return res.json({
                success: true,
                message: 'card number is found!',
                data: result
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class('TAG')
                .method('getCard')
                .call()
            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async addCard(req, res) {
        try {
            req.checkBody('cardNum', 'please enter card number').notEmpty()
            req.checkBody('cardNum', 'card number must be string').notEmpty()
            req.checkBody('cardNum', 'invalid card number').isNumeric().isLength({ min: 16, max: 16 })
            if(this.showValidationErrors(req, res)) return;

            let result = await this.model.Seller.findOne({ _id: req.decodedUser.userId }, { bankId: 1 })
            if(result.bankId.length)
                return res.json({
                    success: false,
                    message: "card number has been added!"
                })
 
            await this.model.Seller.updateOne(
                { _id: req.decodedUser.userId }, 
                { bankId: req.body.cardNum }
            )
            
            return res.json({
                success: true,
                message: 'card number added successfully'
            })    
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addCard')
                .inputParams(req.body)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)    
        }
    }

    async editCard(req, res) {
        try {
            req.checkParams('num', 'card number is invalid').isNumeric().isLength({ min: 16, max: 16 })
            if(this.showValidationErrors(req, res)) return; 

            let result = await this.model.Seller.findOne(
                { _id: req.decodedUser.userId }, 
                { bankId: 1 }
            )
            if(!result.bankId.length)
                return res.json({
                    success: false,
                    message: "card number field is empty!"
                })

            await this.model.Seller.updateOne(
                { _id: req.decodedUser.userId, active: true }, 
                { bankId: req.params.num } 
            )

            return res.json({
                success: true,
                message: 'card number edited'
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('editCard')
                .inputParams(req.params)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }

    async removeCard(req, res) {
        try {

            let result = await this.model.Seller.findOne(
                { _id: req.decodedUser.userId }, 
                { bankId: 1 }
            )
            if(!result.bankId.length)
                return res.json({
                    success: false,
                    message: "card number field is empty!"
                })
            
            await this.model.Seller.updateOne(
                { _id: req.decodedUser.userId, active: true },
                { bankId: "" }
            )
            
            return res.json({
                success: true,
                message: 'card number removed!'
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('removeCard')
                .inputParams({})
                .call()
                
            if(!res.headersSent) return res.status(500).json(handleError)    
        }
    }

}