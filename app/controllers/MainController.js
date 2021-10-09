let Product = require(`${config.path.models.root}/v1/Product`)
let Customer = require(`${config.path.models.root}/v1/Customer`)
let Seller = require(`${config.path.models.root}/v1/Seller`)
let Order = require(`${config.path.models.root}/v1/Order`)
let Admin = require(`${config.path.models.root}/v1/Admin`)
let ErrorTransform = require(`${config.path.transform}/error/Transform`)

module.exports = class MainController {
    constructor() {
        this.model = { Product, Customer, Seller, Order, Admin }
        this.transforms = { ErrorTransform }
    }

    showValidationErrors(req, res) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: 'Unprocessable Entity',
                data: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        } else {
            return false;
        }
    }
}