const mongoose = require("mongoose");

const uri = "mongodb://localhost/todo";

module.exports = function ConnectDB() {
    mongoose.connect(uri);
    mongoose.connection
        .once('open', () => console.log("connected to database"))
        .on('error', (err) => { console.warn("Warning , "), err; });
};