const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Customer"
    },
    //
    cartDetails : [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        },
        productName: {
            type: String
        },
        //
        price : {
            op : {
                type : Number
            },
            cost : {
                type : Number
            },
            discount : {
                type : Number
            }
        },
        category: {
            type: String
        },
        subcategory: {
            type: String
        },
        productImage: {
            type: String
        },
        description: {
            type: String
        },
        quantity: {
            type: Number
        },
        // tagline: {
        //     type: String
        // },
        // admin: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'admin'
        // },
        totalPrice: {
            type: Number
        }

    }]
},{timestamps : true})

const CustomerModel = mongoose.model("customer", customerSchema);
module.exports = CustomerModel