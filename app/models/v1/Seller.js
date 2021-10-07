let mongoose = require('mongoose')
let Schema = mongoose.Schema;
let timeStamps = require('mongoose-timestamp')
let bcrypt = require('bcrypt')

let Seller = new Schema({
    active: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    income : { type: String, default: "0" },
    paid: { type: String, default: "0" },
    bankId: { type: String, default: "0" },
    
    shop: { type: Array, deafult : [{
            ProductId: Schema.Types.ObjectId,
            newPrice: String
        }] 
    },

    sold: { type: Array, default: [{
            orderId: String,
            customerId: String
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