const { log } = require('console');
const fs = require('fs');

console.log("hello rahul");

// const result = fs.readFileSync("./test.txt","utf-8");

// console.log(result);

fs.readFile("./test.txt","utf-8",(err , result) =>{
    console.log(err);
    
})

console.log("hello bhagirath!!!");


