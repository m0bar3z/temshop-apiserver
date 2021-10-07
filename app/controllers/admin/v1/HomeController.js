const Controller = require(`${config.path.controllers.admin}/Controller`)
const TAG = 'v1_Home'
const jwt = require('jsonwebtoken')

module.exports = new class HomeController extends Controller {
    async login(req, res) {
        try {
            res.json({
                message: "login from admin api"
            })
        } catch (error) {
            
        }
    }

    async addProduct(req, res) {
        try {
            res.json({
                message: "add product api"
            })
        } catch (error) {
            
        }
    }

    async editProduct(req, res) {
        try {
            res.json({
                message: "edit product api"
            })
        } catch (error) {
            
        }
    }

    async deleteProduct(req, res) {
        try {
            res.json({
                message: "delete product api"
            })
        } catch (error) {
            
        }
    }
}