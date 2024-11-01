const { getAllProducts } = require("../services/productServices");

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json({ success: true, message: 'Products fetched successfully', data: products });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
  }
    // try {
    //     const products = await ProductModel.find({});
    //     if(products.length > 0) {
    //         return res.status(200).json({ success: true, message: 'Products fetched successfully', data: products });
    //     } else {
    //         return res.status(404).json({ success: false, message: 'No products found', data: null });
    //     }
    // } catch (error) {  
    //     return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    // }
}

const getProductDetailsById = async (req, res) => {
  console.log(req.params.id);
    try {
        const product = await ProductModel.findById(req.params.id)
        if(product) {
            return res.status(200).json({ success: true, message: 'Product fetched successfully', data: product });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found', data: null });
        }
    } catch (error) { 
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
};


const getAllCategories = async () => {
    try {
      const categories = await ProductModel.distinct('category');
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

const getProductsByCategory = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.json({ categories });
      } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Server error' });
      }
}

const getSubcategories = async (req, res) => {
    const categoryName = req.params.categoryName;
    try {
      // Find all products with the given category name
      const products = await ProductModel.find({ category: categoryName });
  
      // Extract unique subcategories from products
      const subcategories = [...new Set(products.map(product => product.subcategory))];
  
      res.json({ subcategories });
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const getProductsBySubcategory = async (req, res) => {
    try {
        const products = await ProductModel.find({ subcategory: req.params.subcategory });
        res.json({ products });
      } catch (error) {
        res.status(500).send('Server Error');
      }
}

const searchProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({ productName: new RegExp(req.params.query, 'i') });
        res.json({ products });
      } catch (error) {
        res.status(500).send('Server Error');
      }
}

module.exports = {
    getProducts,
    getProductDetailsById,
    getProductsByCategory,
    getSubcategories,
    getProductsBySubcategory,
    searchProducts
}