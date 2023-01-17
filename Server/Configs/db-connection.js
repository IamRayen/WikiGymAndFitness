const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('strictQuery', true);

const startServer = async (connectToPort) => {
    try {
        await mongoose.connect(process.env.URI);
        connectToPort()
        console.log("DB connected")
    } catch (error) {
        console.log(error);
    }
};

module.exports = startServer
