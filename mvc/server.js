const express = require("express");
require("./config/db.config");
const app = express();

const port = 12000;

app.use(express.static(__dirname));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/employee.route'));

app.listen(port, (err) => {
    if (err) {
        console.log("server is not strated!!!", err);
        return false;

    }
    else {
        console.log("server is started!!!!");

    }
})



   