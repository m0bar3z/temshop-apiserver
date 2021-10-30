let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let timeStamps = require('mongoose-timestamp')
let bcrypt = require('bcrypt')

let Seller = new Schema({
    active: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    income : { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
    bankId: { type: String, default: "" },
    
    shop: { type: Array, deafult : [{
            product: Schema.Types.ObjectId,
            newPrice: Number
        }] 
    },

    sold: { type: Array, default: [{
            orderId: String,
            customer: Schema.Types.ObjectId
        }] 
    }
})

Seller.pre('save', function(next) {
    if(!this.isModified('password')) return next()

    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash
        next()
    })
})

Seller.plugin(timeStamps)

module.exports = mongoose.model('Seller', Seller)