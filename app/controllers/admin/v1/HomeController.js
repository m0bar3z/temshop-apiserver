const Controller = require(`${config.path.controllers.admin}/Controller`)
const TAG = 'v1_Home'
const jwt = require('jsonwebtoken')

module.exports = new class HomeController extends Controller {
    async login(req, res) {
        try {
            res.json({
                message: "login from admin api"
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErroTransfrom(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('login')
                .inputParams(req.body)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}