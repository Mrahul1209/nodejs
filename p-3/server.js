
const express = require("express");
const path = require('path');
const PORT = 12000;

const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.get(`/`, (req, res) => {
    res.render(`home`);
});

app.listen(PORT, (err) => {
    if (err) {
        console.log("Server not started...", err);
        return false;
    }
    console.log("Server is started...");
});


