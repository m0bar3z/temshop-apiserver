const path = require('path')

module.exports = {
    salt: 10,
    secret: "your_secret_key",
    audience: 'audience',
    algorithm: 'HS256',
    issuer: 'issuer',
    customerScope: 'customer',
    sellerScope: 'seller',
    adminScope: 'admin',
    idTokenExpire: '100h',
    accessTokenExpire: '100h',
    publicRoute: [
        '/api/admin/v1/login',
        '/api/seller/v1/login',
        '/api/seller/v1'
    ],
    path: {
        controllers: {
            root: path.resolve('./app/controllers'),
            customer: path.resolve('./app/controllers/customer'),
            seller: path.resolve('./app/controllers/seller'),
            admin: path.resolve('./app/controllers/admin')
        },
        models: {
            root: path.resolve('./app/models'),
            error: path.resolve('./app/models/error')
        },
        transform: path.resolve('./app/transforms'),
        mainController: path.resolve('./app/controllers/MainController')
    }
}