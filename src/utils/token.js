const jwt = require("jsonwebtoken");
const { config } = require("../configs/server.config");
const createToken = (payload)=>{
    const token = jwt.sign({email : payload.email, name: payload.name}, config.secretKey, {expiresIn : "10d"});
    return token
};
module.exports = {createToken};