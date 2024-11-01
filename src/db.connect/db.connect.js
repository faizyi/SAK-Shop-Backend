const mongoose = require("mongoose");
const { config } = require("../configs/server.config");
const connectDB = async ()=>{
    try {
        await mongoose.connect(config.dbURI)
        .then(() => {
            console.log("Connected to MongoDB database successfully.");
          })
          .catch((error) => {
            console.log("Error connecting to MongoDB: ", error.message);
          });
    } catch (error) {
        console.log("Database connection error: ", error.message);
    }
}
module.exports = connectDB;