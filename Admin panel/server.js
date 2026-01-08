const express = require('express');
require('./config/db.config');

const app = express();

const port = 12000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log("Server is Not started !!!!", err);
        return;

    }
    else {
        console.log("Server is Strated.!!!!!1");

    }
})