module.exports = (err ,req ,res ,next) => {
    if(err.name === 'UnauthorizedError') {
        return res.status(err.status).json({
            success: false,
            message: err.message
        })
    }
    next()
}