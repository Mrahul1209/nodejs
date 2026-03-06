const express = require('express');
const upload = require('../middleware/category.multer.middleware');

const { addCategoryPage, addCategory, allCategoryViewPage, deleteCategory, editCategory, updateCategory } = require('../controller/category.controller');

const categoryRoute = express.Router();

// add category page rendering and all category logic 
categoryRoute.get('/addCategoryPage', addCategoryPage);
categoryRoute.post('/addCategory', upload.single('category_image'), addCategory);

// view all category page rendering and logic 
categoryRoute.get('/allCategoryViewPage', allCategoryViewPage);

// delete category logic 
categoryRoute.get('/deleteCategory/:categoryId', deleteCategory);

// edit category page rendering 
categoryRoute.get('/editCategory/:categoryId', editCategory);
categoryRoute.post('/updateCategory/:categoryId', upload.single('category_image'), updateCategory);

module.exports = categoryRoute; 