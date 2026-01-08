const express = require('express');

const { homepage, aboutpage, contactpage } = require('../controllers/home.controller');

const route = express.Router();


console.log("Routing....");

route.get('/', homepage);
route.get('/about', aboutpage);
route.get('/contact', contactpage);


module.exports = route;