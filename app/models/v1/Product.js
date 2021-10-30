let mongoose = require('mongoose')
let Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp')

let Product =  new Schema({ 
    active: { type: Boolean, default: true },
    name: { type: String, required: true },
    price: { type: Number, required: true},
    images: { type: Array, default: []},
    seller: { type: Array, default: [{ type: Schema.Types.ObjectId, ref: 'Seller' }] }
})

Product.plugin(timestamp)

module.exports = mongoose.model('Product', Product)