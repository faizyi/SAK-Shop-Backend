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
    admin : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'admin',
        required: true
    }
}, {timestamps : true});

const AdminTokenModel = mongoose.model('adminToken', tokenSchema);

module.exports = AdminTokenModel