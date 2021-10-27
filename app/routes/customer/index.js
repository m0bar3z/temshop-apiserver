const express = require('express')
const router = express.Router()
const v1 = require('./v1')
const auth = require('./middleware/auth')
const authError = require('./middleware/authError')

router.use(auth, authError)
router.use('/v1', v1)

module.exports = router