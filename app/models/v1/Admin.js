const mongoose = require('mongoose')
const Schema = mongoose.Schema
const timeStamps = require('mongoose-timestamp')
let bcrypt = require('bcrypt')


let Admin = new Schema({
    active: { type: Boolean, default: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

Admin.pre('save', function(next) {
    if(!this.isModified('password')) return next()

    bcrypt.hash(this.password, config.salt, (err, hash) => {
        this.password = hash;
        next()
    })
})

Admin.plugin(timeStamps)

module.exports = mongoose.model('Admin', Admin)