const express = require('express');
const { addExtraCategoryPage, addExtraCategory, viewAllExtraCategory, deleteExtraCategory, editExtraCategory, updateExtraCategory } = require('../controller/extracategory.controller');

const extraCategoryRoute = express.Router();

// extra category add page rendering and add logic route 
extraCategoryRoute.get('/addExtraCategoryPage', addExtraCategoryPage);
extraCategoryRoute.post('/addExtraCategory', addExtraCategory);

// view all sub category page rendering and logic 
extraCategoryRoute.get('/viewAllExtraCategoryPage', viewAllExtraCategory);

// edit and update extra category page rendering and logic 
extraCategoryRoute.get('/editExtraCategoryPage', editExtraCategory);
extraCategoryRoute.post('/updateExtraCategory/:extraCategoryId', updateExtraCategory);

// delete extra category 
extraCategoryRoute.get('/deleteExtraCategory/:extraCategoryId', deleteExtraCategory);

module.exports = extraCategoryRoute;