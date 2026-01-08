const mongoose = require('mongoose');

const URI = "mongodb://localhost:27017/Employee-management";

mongoose.connect(URI).then(() => {
    console.log("database is connected !!!!");

}).catch(err => {
    console.log("database is not conected!!!!", err);



})