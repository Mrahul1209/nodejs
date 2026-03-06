const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("database is connected !!!!");
}).catch(err => {
    console.log("database is not conected!!!!", err);
});          