const express = require('express');
const { addcategory, addcategorypage } = require('../controllers/category.controller');

const categoryRoute = express.Router();

categoryRoute.get('/addcategory', addcategory);

categoryRoute.post('/addcategory', addcategorypage);


module.exports = categoryRoute;