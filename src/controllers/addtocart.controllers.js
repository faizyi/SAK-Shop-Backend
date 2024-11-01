const CustomerModel = require("../models/customer.model");
const ProductModel = require("../models/product.model");

const addToCart = async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    try {
        let customer = await CustomerModel.findById(customerId);

        // Find the product to add to cart
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Check if the product already exists in the cart
        const index = customer.cartDetails.findIndex(item => item.product.equals(productId));

        if (index !== -1) {
            // Product exists, update quantity and total price
            customer.cartDetails[index].quantity += quantity;
            customer.cartDetails[index].totalPrice += quantity * product.price.op; // Adjust based on your product price structure
        } else {
            // Product does not exist, add new item to cart
            const newCartItem = {
                product: productId,
                productName: product.productName,
                price: {
                    op: product.price.op,
                    cost: product.price.cost,
                    discount: product.price.discount
                },
                category: product.category,
                subcategory: product.subcategory,
                productImage: product.productImage,
                description: product.description,
                quantity: quantity,
                tagline: product.tagline,
                admin: product.admin,
                totalPrice: quantity * product.price.op // Adjust based on your product price structure
            };

            customer.cartDetails.push(newCartItem);
        }

        await customer.save();
        return res.status(200).json({ success: true, message: 'Product added to cart successfully', data: customer });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        return res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};

const getCartData = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const customer = await CustomerModel.findById(customerId).populate('cartDetails.product');
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const cartDetails = customer.cartDetails;
        let totalItems = 0;
        let totalPrice = 0;

        cartDetails.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price.op * item.quantity;
        });

        res.status(200).json({ success: true, data: { cartDetails, totalItems, totalPrice } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};

const updateCartQuantity = async (req, res) => {
    const { customerId, productId, quantity } = req.body;

    try {
        const customer = await CustomerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        const cartItem = customer.cartDetails.find(item => item.product.toString() === productId);
        if (cartItem) {
            cartItem.quantity = quantity;
        }

        await customer.save();
        res.status(200).json({ success: true, message: 'Cart updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    const { customerId, productId } = req.body;

    try {
        const customer = await CustomerModel.findById(customerId);
        if (!customer) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        customer.cartDetails = customer.cartDetails.filter(item => item.product.toString() !== productId);
        await customer.save();

        res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: error.message });
    }
};

module.exports = {
    addToCart,
    getCartData,
    updateCartQuantity,
    removeCartItem
};
