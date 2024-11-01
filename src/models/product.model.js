const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    productName: {
        type: String
    },
    //
    price : {
        op : {
            type : Number
        },
        // cost : {
        //     type : Number
        // },
        // discount : {
        //     type : Number
        // }
    },
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    productImage: {
        type: [String]
    },
    description: {
        type: String
    },
    quantity: {
        type: String,
        default : 1
    },

},{timestamps : true});
const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
