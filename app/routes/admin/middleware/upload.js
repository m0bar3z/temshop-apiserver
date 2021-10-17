const multer = require('multer')
const fs = require('fs')

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = `./uploads/products/images` 
        fs.mkdir(dir, { recursive: true }, (err) => {
            if (err) throw err;
            cb(null, dir)
        });
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ""))
    }
})

const imageFilter = (req, file, cb) => {
    file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' 
    ? cb(null, true)
    : cb(null, false)
}

const productImage = multer({ 
    storage: imageStorage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: imageFilter
})

module.exports = {
    productImage
}