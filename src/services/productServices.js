const ProductModel = require("../../src/models/product.model");
const getAllProducts = async () => {
    try {
        const products = await ProductModel.find({});
        if(products.length > 0) {
            return products;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {getAllProducts};