let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

let ServerError = new Schema({
    project: String,
    errorType: String,
    parent: String,
    class: String,
    method: String,
    inputParams: Object,
    message: String,
    stack: String
});

ServerError.plugin(timestamps);




module.exports = mongoose.model('ServerError', ServerError);