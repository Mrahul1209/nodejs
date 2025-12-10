const express = require("express");

const port = 12000;


const app = express;

app.ser(`view engine` ,`ejs`);

const middleware =(req,res,next) => {
    
}



app.get(`/`, (req, res) => {
    return res.render(`home`);
})
app.get(`/about`, (req, res) => {
    return res.render(`about`);
})
app.listen(port, (err) => {
    if (err) {
        console.log("server is not started!!!");
        return false;

    }
    else {
        console.log("server is started!!");

    }
})
