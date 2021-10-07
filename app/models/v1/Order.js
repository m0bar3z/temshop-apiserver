let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let timeStamps = require('mongoose-timestamp')


let Order = new Schema({
    delivered: { type: Boolean, default: false },
    productId: { type: Schema.Types.ObjectId },
    customerId: { type: Schema.Types.ObjectId },
    orderId: { type: String, index: true },
    quantity: { type: String, default: "1" },
    size: { type: String },
    maxPrice: { type: String },
    seller: { type: String },
    sellerId: { type: Schema.Types.ObjectId }
})

Order.plugin(timeStamps);


module.exports = mongoose.model("Order", Order)