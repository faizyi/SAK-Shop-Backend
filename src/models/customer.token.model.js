const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    accessToken : {
        type: String,
        required: true
    },
    // refreshToken : {
    //     type: String,
    //     required: true
    // },
    customer : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required: true
    }
}, {timestamps : true});

const CustomerTokenModel = mongoose.model('customerToken', tokenSchema);

module.exports = CustomerTokenModel