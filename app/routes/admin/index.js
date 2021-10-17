const express = require('express')
const router = express.Router()

const auth = require('./middleware/auth')
const authError = require('./middleware/authError')
let { productImage } = require('./middleware/upload')
const v1 = require('./v1')

router.use(auth, authError)
router.use(productImage.array('image', 4))
router.use('/v1', v1)

module.exports = router