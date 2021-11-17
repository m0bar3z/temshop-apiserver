const Controller = require(`${config.path.controllers.customer}/Controller`)
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
            req.checkBody('mobile', 'mobile must be string').isString()
            req.checkBody('mobile', 'mobile must be numeric').isNumeric();
            if(this.showValidationErrors(req, res)) return;
            
            //google captcha 
            //validate mobile number
            let result = await this.model.Customer.findOne({ $or : [ { 'username': req.body.username }, { 'mobile': req.body.mobile } ]})
            if(result) 
                return res.json({
                    success: false,
                    message: "username or mobile is taken!"
                })

            let user = await this.model.Customer.create(req.body)
                
            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            
            let payload = {
                username: req.body.username,
                userId: user._id,
                userStatus: user.active
            }
            let idToken = jwt.sign(payload, config.secret, options)

            options = {
                expiresIn: config.accessTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope: config.customerScope }
            let accessToken = jwt.sign(payload, config.secret, options)

            return res.json({
                success: true,
                message: "registered successfully",
                data: {
                    idToken,
                    accessToken
                }
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
            req.checkBody('username', 'please enter username').notEmpty()
            req.checkBody('username', 'username must be string').isString()
            req.checkBody('username', 'username is too short or too long').isLength({ min: 4, max: 15});
            req.checkBody('password', 'please enter password').notEmpty()
            req.checkBody('password', 'password must be string').isString()
            req.checkBody('password', 'password is too short or too long').isLength({ min: 5, max: 24 });
            if(this.showValidationErrors(req, res)) return;

            //google captcha
            let user = await this.model.Customer.findOne({ 'username': req.body.username})
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
                userId: user._id,
                userStatus: user.active
            }
            let idToken = jwt.sign(payload, config.secret, options)

            options = {
                expiresIn: config.accessTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope: config.customerScope }
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
        catch (error) {
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