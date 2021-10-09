const Controller = require(`${config.path.controllers.admin}/Controller`)
const TAG = 'v1_Home'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = new class HomeController extends Controller {
    async login(req, res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty()
            req.checkBody('username', 'username must be string').isString()
            req.checkBody('username', 'username is too short or too long').isLength({ min: 4, max: 15});
            req.checkBody('password', 'please enter password').notEmpty()
            req.checkBody('password', 'password must be string').isString()
            req.checkBody('password', 'password is too short or too long').isLength({ min: 5, max: 24 });
            if(this.showValidationErrors(req, res)) return;
            
            let result = await this.model.Admin.findOne({ 'username': req.body.username })
            if(!result)
                return res.json({
                    success: false,
                    message: 'username not found'
                })
            
            let passwordStatus = await bcrypt.compare(req.body.password, result.password)
            
            if(!passwordStatus)
                return res.json({
                    success: false,
                    message: 'password is incorrect'
                })

            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
    
            let payload = {
                id: result._id,
                active: result.active
            }
                           
            let idToken = jwt.sign(payload, config.secret, options)
            
            options = {
                expiresIn: config.accessTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = {
                scope: config.adminScope
            }
            
            let accessToken = jwt.sign(payload, config.secret, options)

            return res.json({
                success: true,
                message: 'logged in successfully',
                data:  { idToken, accessToken }
            })
        } 
        catch (error) {
            let handleError = new this.transforms.ErrorTransform(error)
                .parent(this.controllerTag)
                .class(TAG)
                .method('login')
                .inputParams(req.body)
                .call()

            if(!res.headersSent) return res.status(500).json(handleError)
        }
    }
}