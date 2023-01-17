const express = require("express");
const dotenv = require("dotenv").config();
const startServer = require("./Configs/db-connection");
const postRoutes = require('./Routes(api)/postRoutes')

//init app
const app = express();
app.use(express.json());

//start server and connect to DB
startListening = () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.info(`Server is running on port ${PORT}`);
    });
};
startServer(startListening);

//routes
app.use("/blog",postRoutes)
