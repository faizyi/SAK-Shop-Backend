const { body } = require("express-validator");

const validation = [
    body("name").trim().matches(/^[a-zA-Z ]+$/).withMessage("Name is invalid"),
    body("email").trim().isEmail().withMessage("Email is invalid"),
    body("password").trim().isLength({ min: 6 }).withMessage("Password must be 6 char"),
]

module.exports = { validation }