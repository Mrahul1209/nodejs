const express = require('express');
const { addSubCategoryPage, addSubCategory, viewSubCategoryPage, deleteSubCategory, editSubCategoryPage, updateSubCategory } = require('../controller/subcategory.controller');

const subCategoryRoute = express.Router();

// add sub category page and logic to add
subCategoryRoute.get('/addSubCategoryPage', addSubCategoryPage);
subCategoryRoute.post('/addSubCategory', addSubCategory);

// view sub category page rendering
subCategoryRoute.get('/viewSubCategoryPage', viewSubCategoryPage);

// edit page rendering and updateing logic 
subCategoryRoute.get('/editSubCategoryPage/:subCategoryId', editSubCategoryPage);
subCategoryRoute.post('/updateSubCategory/:subCategoryId', updateSubCategory);

// delete sub category logic 
subCategoryRoute.get('/deleteSubCategory/:subCategoryId', deleteSubCategory);

module.exports = subCategoryRoute;