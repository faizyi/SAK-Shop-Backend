const express = require("express");
const cors = require("cors");
const { config } = require("./src/configs/server.config");
const connectDB = require("./src/db.connect/db.connect");
const Routes = require("./src/routes/routes");
const corsOption = require("./src/configs/cors.config");
const bodyParser = require("body-parser");
const app = express();


const PORT = config.appPort;
connectDB();
app.use(bodyParser.json({ limit: "50mb" })); // Increase limit for large files
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use(cors(corsOption));

app.use("/", Routes);
app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})


 