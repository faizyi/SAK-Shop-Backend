const {validationResult} = require("express-validator");
const AdminModel = require("../models/admin.model");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const AdminTokenModel = require("../models/admin.token.models");
const { createToken } = require("../utils/token");

const adminRegister = async (req, res) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
          }
        const {name, email, password } = req.body;
        console.log(name, email, password);
        const admin = await AdminModel.findOne({ email });
        if(admin) {
            return res.status(401).json({ success: false, message: 'Signup failed', data: null });
        }
        const hash = await hashPassword(password);
        const payload = { name, email, password : hash };
        const createAdmin = new AdminModel(payload);
        const saveAdmin = await createAdmin.save();
        if(!saveAdmin) return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
        saveAdmin.password = undefined;
        res.status(200).json({ success: true, message: 'Signup Successful', data: null });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const admin = await AdminModel.findOne({ email });
        if(!admin) return res.status(401).json({ success: false, message: 'Invalid Credentials', data: null });   
        const isAlreadyLoggedin = await AdminTokenModel.find({admin : admin._id});
        if (isAlreadyLoggedin?.length > 0) return res.status(403).json({ success: false, message: 'already logged in', data: null });
        const matchPassword = await comparePassword(password, admin.password);
        if(!matchPassword) return res.status(401).json({ success: false, message: 'Invalid credentials', data: null });
        const accessToken = createToken(admin);
        const token = new AdminTokenModel({accessToken : accessToken, admin : admin._id});
        await token.save();
        // if(!saveToken) return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
        res.status(200).json({ success: true, message: 'Login Successful', data: null });

    } catch (error) {
        return res.status(401).json({ success: false, message: 'Something went wrong', data: null });
    }
}

const adminLogout = async (req, res) => {
    try {
        const adminId = req.body;
        const response = await AdminTokenModel.deleteMany({admin : adminId});
        if(response.deletedCount === 0) return res.status(500).json({ success: false, message: 'Already logged out', data: null });
        return res.status(200).json({ success: true, message: 'Successfully logged out', data: null });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Something went wrong', data: null });
    }
}

module.exports={
    adminRegister,
    adminLogin,
    adminLogout
}