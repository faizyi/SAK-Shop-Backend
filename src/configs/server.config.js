require("dotenv").config();
const config={
    appPort : process.env.SERVER_PORT,
    dbURI : process.env.MONGO_URI,
    secretKey : process.env.SECRET_KEY,
}
module.exports={config}