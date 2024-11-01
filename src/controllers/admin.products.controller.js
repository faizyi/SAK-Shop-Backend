const CustomerModel = require("../models/customer.model");
const ProductModel = require("../models/product.model")

const productCreate = async (req, res) => {
    console.log(req.body)
    try {
        const product = new ProductModel(req.body);
        const response = await product.save();

        // if(!response) return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
        return res.status(200).json({ success: true, message: 'Product created successfully', data: response });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const getAdminProductsById = async (req, res) => {
    try {
        const products = await ProductModel.find({admin : req.params.id});
        if(products.length > 0){
            return res.status(200).json({ success: true, message: 'Products fetched successfully', data: products });
        }else{
            return res.status(404).json({ success: false, message: 'No products found', data: null });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const updateAdminProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndUpdate(req.params.id,
            { $set : req.body },
            { new : true }
        )
        if(!product) return res.status(500).json({ success: false, message: 'Product not found', data: null });
        return res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const deleteAdminProduct = async (req, res) => {
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        // await CustomerModel.updateMany(
        //     {"cartDetails._id" : product._id},
        //     {$pull : {"cartDetails" : {_id : product._id}}}
        // )
        if(!product) return res.status(500).json({ success: false, message: 'Product not found', data: null });
        return res.status(200).json({ success: true, message: 'Product deleted successfully', data: product });
    } catch (error) {
         return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const deleteAdminProducts = async (req, res) => {
    try {
        const product = await ProductModel.deleteMany({admin : req.params.id});
        const delCount = product.deletedCount || 0;
        if(delCount === 0) return res.status(500).json({ success: false, message: 'No products found', data: null });

        // const deletedProducts = await ProductModel.find({ seller: req.params.id });
        // await CustomerModel.updateMany(
        //     { "cartDetails._id": { $in: deletedProducts.map(product => product._id) } },
        //     { $pull: { cartDetails: { _id: { $in: deletedProducts.map(product => product._id) } } } }
        // );
        return res.status(200).json({ success: true, message: 'Product deleted successfully', data: product });
    } catch (error) {
         return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}


module.exports = { 
    productCreate,
    getAdminProductsById,
    updateAdminProduct,
    deleteAdminProduct,
    deleteAdminProducts
 }