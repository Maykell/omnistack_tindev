const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DevRoute = require("./routes/DevRoute");

const server = express();

mongoose.connect(
    "mongodb+srv://omnistack:omnistack@cluster0-cnf4a.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
);

mongoose.connection.on("error", function(error) {
    console.error("Database connection error:", error);
});

server.use(cors());
server.use(express.json());
server.use(DevRoute);

server.listen(3333);
