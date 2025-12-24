const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/Book-Management";


mongoose.connect(URI).then(() => {
    console.log("database is connected !!!");

}).catch(err => {
    console.log("database is not connected !!!!");
    console.log("error :", err);

}).finally(() => {
    console.log("finally !!!");

})