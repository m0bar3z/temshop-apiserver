let mongoose = require('mongoose')
let Schema = mongoose.Schema
let timeStamps = require('mongoose-timestamp')
const bcrypt = require('bcrypt')

let Customer = new Schema({
    active: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    address: { type: String, default: "" },
    payment: { type: Array, default: [{
            addPaymentRes: Object,
            verifyPaymentRes: Object,
            orderId: String
        }] 
    },
    cart: { type: Array, default: [{
            product: Schema.Types.ObjectId,
            seller: Schema.Types.ObjectId,
            quantity: String,
            size: String,
            maxPrice: Number,
            orderId: String,
            isPaid: Boolean,
        }]
    },
    favorite: { type: Array, "default": [{
            productId: Schema.Types.ObjectId
        }] 
    }
})

Customer.pre('save', function(next) {
    if(!this.isModified('password')) return next();
    
    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash
        next()
    })
})

Customer.plugin(timeStamps)

module.exports = mongoose.model('Customer', Customer)