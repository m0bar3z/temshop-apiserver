const Controller = require(`${config.path.controllers.seller}/Controller`)
const TAG = 'v1_Home'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = new class HomeController extends Controller {
    async register(req, res) {
        try {
            req.checkBody('username', 'please enter correct username').notEmpty().isString();
            req.checkBody('username', 'username is too short or too long').isLength({ min: 4, max: 15})
            req.checkBody('password', 'please check password').notEmpty().isString();
            req.checkBody('password', 'password is too short or too long').isLength({ min: 5, max: 24 })
            req.checkBody('mobile', 'please enter mobile number').notEmpty()
            req.checkBody('mobile', 'mobile number must be string').isString()
            req.checkBody('mobile', 'mobile parameter must be numeric and string').isNumeric();
            if(this.showValidationErrors(req, res)) return;
            
            let result = await this.model.Seller.findOne({ $or : [ { 'username': req.body.username }, { 'mobile': req.body.mobile } ]})
            if(result) 
                return res.json({
                    success: false,
                    message: "username or mobile is taken!"
                })

            await this.model.Seller.create(req.body)

            return res.json({
                success: true,
                message: "registered successfully"
            })
        } 
        catch (err) {
            let handleError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('register')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handleError);    
        }
    }

    async login(req, res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty().isString();
            req.checkBody('username', 'username is too short or too long').isLength({ min: 4, max: 15});
            req.checkBody('password', 'please enter password').notEmpty().isString();
            req.checkBody('password', 'password is too short or too long').isLength({ min: 5, max: 24 });

            let user = await this.model.Seller.findOne({ 'username': req.body.username})
            if(!(user && user.active))
                return res.json({
                    success: false,
                    message: "Username not found!"
                })
            
            let status = await bcrypt.compare(req.body.password, user.password)

            if(!status)
                return res.json({
                    success: false,
                    message: "Password is incorrect"
                })
            
            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            
            let payload = {
                username: req.body.username,
                userId: user.user_id,
                userStatus: user.active
            }
            let idToken = jwt.sign(payload, config.secret, options)

            options = {
                expiresIn: config.accessTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope: config.sellerScope }
            let accessToken = jwt.sign(payload, config.secret, options)
            
            return res.json({
                success: true,
                data: {
                    idToken,
                    accessToken
                },
                message: "Logged in successfully"
            })
        } 
        catch (err) {
            let handleError = new this.transforms.ErrorTransform(err)
            .parent(this.controllerTag)
            .class(TAG)
            .method('login')
            .inputParams(req.body)
            .call();

            if (!res.headersSent) return res.status(500).json(handleError);    
        }
    }
}