const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    let idToken = req.body.idToken || req.query.idToken || req.headers['idtoken']
    let accessToken = req.body.accessToken || req.query.accessToken || req.headers['authorization']


    let publicRoute = config.publicRoute
    if(publicRoute.includes(req.originalUrl))
        return next()
        

    if(!(idToken && accessToken)) {
        return res.status(401).json({
            success: false,
            message: 'no token provided'
        })
    }

    let options = {
        algorithms: config.algorithms,
        audience: config.audience,
        issuer: config.issuer
    }

    jwt.verify(accessToken, config.secret, options, (err, decoded) => {
        if(err)
            throw {
                name: 'UnauthorizedError',
                status: 403,
                message: 'token has expired'
            }

        if(decoded === undefined)
            throw {
                name: 'UnauthorizedError',
                status: 403,
                message: 'accessToken is not valid'
            }

        let hasScope = decoded.scope === config.sellerScope
        if(!hasScope)
            throw {
                name: 'UnauthorizedError',
                status: 401,
                message: 'permission denied'
            }
    })

    jwt.verify(idToken, config.secret, options, (err, decoded) => {
        if(err) 
            throw {
                name: 'UnauthorizedError',
                status: 403,
                message: 'token has expired'
            }

        if(decoded === undefined)
            throw {
                name: 'UnauthorizedError',
                status: 403, 
                message: 'idToken is not valid'
            }
        req.decodedUser = decoded

        next()
    })
}