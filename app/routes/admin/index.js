const express = require('express')
const router = express.Router()

//const uploadMiddleware = require('./middleware/upload')
const auth = require('./middleware/auth')
const authError = require('./middleware/authError')
const v1 = require('./v1')

router.use(auth, authError)
router.use('/v1', v1)

module.exports = router