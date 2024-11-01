const {validationResult} = require("express-validator");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/token");
const CustomerModel = require("../models/customer.model");
const CustomerTokenModel = require("../models/customer.token.model");

const cutomerRegister = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
          }
        const {name, email, password } = req.body;
        console.log(name, email, password);
        const customer = await CustomerModel.findOne({ email });
        if(customer) {
            return res.status(401).json({ success: false, message: 'Signup failed', data: null });
        }
        const hash = await hashPassword(password);
        const payload = { name, email, password : hash };
        const createCustomer = new CustomerModel(payload);
        const saveCustomer = await createCustomer.save();
        if(!saveCustomer) return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
        saveCustomer.password = undefined;
        res.status(200).json({ success: true, message: 'Signup Successful', data: null });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const customerLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const customer = await CustomerModel.findOne({ email });
        if(!customer) return res.status(401).json({ success: false, message: 'Invalid Credentials', data: null });   
        const isAlreadyLoggedin = await CustomerTokenModel.find({customer : customer._id});
        if (isAlreadyLoggedin?.length > 0) return res.status(403).json({ success: false, message: 'already logged in', data: null });
        const matchPassword = await comparePassword(password, customer.password);
        if(!matchPassword) return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        const accessToken = createToken(customer);
        const token = new CustomerTokenModel({accessToken : accessToken, customer : customer._id});
        await token.save();
        // if(!saveToken) return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
        res.status(200).json({ success: true, message: 'Login Successful', data: null });

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const customerLogout = async (req, res) => {
    try {
        const customerId = req.body;
        const response = await CustomerTokenModel.deleteMany({customer : customerId});
        if(response.deletedCount === 0) return res.status(500).json({ success: false, message: 'Already logged out', data: null });
        return res.status(200).json({ success: true, message: 'Successfully logged out', data: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

module.exports = {
       cutomerRegister,
       customerLogin,
       customerLogout
}