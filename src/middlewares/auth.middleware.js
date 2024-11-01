const jwt = require("jsonwebtoken");
const { config } = require("../configs/server.config");
const authMiddleware = (req,res,next)=>{
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        console.log(token);
        if(!token){
            return res.status(401).json({ success: false, message: 'unauthorized', data: null })
        }
        const isValid = jwt.verify(token, config.secretKey);
        console.log(isValid);
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'unauthorized', data: error })
    }
}

module.exports = {authMiddleware};