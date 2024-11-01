const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (plainText) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainText, salt);
    return hash;
};
const comparePassword = async (plainText, hashedText) => {
    const isCompared = await bcrypt.compare(plainText, hashedText)
    return isCompared
};
module.exports = { hashPassword, comparePassword }