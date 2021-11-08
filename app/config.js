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
    idTokenExpire: '1000h',
    accessTokenExpire: '1000h',
    idPayHeaders: {
        "x-api-key": "6a7f99eb-7c20-4412-a972-6dfb7cd253a4",
        "x-sandbox": true,
        "content-type": "application/json"
    },
    publicRoute: [
        '/api/admin/v1/login',
        '/api/seller/v1/login',
        '/api/seller/v1',
        '/api/customer/v1',
        '/api/customer/v1/login'
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