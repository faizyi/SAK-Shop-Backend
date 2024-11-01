const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { config } = require("./src/configs/server.config");
const Routes = require("./src/routes/routes");
const corsOption = require("./src/configs/cors.config");
const bodyParser = require("body-parser");
const { DB_RETRY_LIMIT, DB_RETRY_TIMEOUT } = require("./src/constants/constants");

let connnectionRetries = 0
async function connectToDB() {
    try {
        console.log("Establishing DB connection....")
        await mongoose.connect(config.dbURI)
        console.log("DB connected")
    } catch (error) {
        if (connnectionRetries < DB_RETRY_LIMIT) {
            connnectionRetries++
            // setTimeout(async() => {

            // } , DB_RETRY_TIMEOUT)
            console.log(`Reconnecting to DB ${connnectionRetries}/${DB_RETRY_LIMIT}`)
            await new Promise(resolve => setTimeout(resolve, DB_RETRY_TIMEOUT))
            await connectToDB()
        } else {
            process.exit()
        }
    }
}

const PORT = config.appPort;
const app = express();
connectToDB()
    .then(res => console.log("Connected"))
    .catch(err => console.log("DB NOT Connected"))
app.use(bodyParser.json({ limit: "50mb" })); // Increase limit for large files
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use(cors(corsOption));

app.use("/", Routes);
app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

 