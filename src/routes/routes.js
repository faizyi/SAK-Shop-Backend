const router = require('express').Router();
const { addToCart, getCartData, updateCartQuantity, removeCartItem } = require('../controllers/addtocart.controllers.js');
const { adminRegister, adminLogin, adminLogout } = require("../controllers/admin.controllers.js");
const { productCreate, getAdminProductsById, updateAdminProduct, deleteAdminProduct, deleteAdminProducts } = require('../controllers/admin.products.controller.js');
const { cutomerRegister, customerLogin, customerLogout } = require('../controllers/customer.controllers.js');
const { getProducts, getProductDetailsById, getProductsByCategory, getSubcategories, 
getProductsBySubcategory, searchProducts } = require('../controllers/products.controllers.js');
const { validation } = require('../validators/validators.js');



//admin 
router.post("/AdminRegister", validation,  adminRegister);
router.post("/AdminLogin" , adminLogin);
router.post("/AdminLogout" , adminLogout);

//Adminproducts
router.post("/productCreate", productCreate);
router.get("/getAdminProductsById/:id", getAdminProductsById);
router.put("/ProductUpdate/:id", updateAdminProduct);
router.delete("/ProductDelete/:id", deleteAdminProduct);
router.delete("/ProductsDelete/:id", deleteAdminProducts);

//products
router.get("/getProducts", getProducts);
router.get("/getProductDetails/:id", getProductDetailsById);
router.get("/getProductsCategories", getProductsByCategory);
router.get("/getSubcategories/:categoryName", getSubcategories);
router.get("/getProductsBySubcategory/:subcategory", getProductsBySubcategory);

//search
router.get("/searchProducts/:query", searchProducts)

//cart
router.post('/addToCart', addToCart);
router.get('/getCartData/:customerId', getCartData);
router.post('/updateCartQuantity', updateCartQuantity);
router.post('/removeCartItem', removeCartItem);

//customer
router.post("/CustomerRegister", cutomerRegister);
router.post("/CustomerLogin" , customerLogin);
router.post("/CustomerLogout" , customerLogout);


module.exports = router;