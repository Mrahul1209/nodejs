const express = require("express");
const fs =require("fs");

const app = express();

app.get("/",(req,res) => {
    fs.readFile(`index.html`,(err,data) => {
        res.end(data);
    })
});

app.get("/about",(req,res) => {
    fs.readFile(`about.html`,(err,data) => {
        res.end(data);
    })
});
app.get("/contact",(req,res) => {
    fs.readFile(`contact.html`,(err,data) => {
        res.end(data);
    })
});

app.listen(12000 , (err) => {
    if(err)
    {
        console.log("server is not started !!!",err);
        return false;
        
    }
    else
    {
        console.log("server is started....");
        
    }
})

