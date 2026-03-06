const express = require('express');
const { addProductPage, addProduct, viewAllProductPage, findOneProductToView, deleteProduct, editProductPage, editProduct } = require('../controller/product.controller');

const upload = require('../middleware/product.multer.middleware');

const productRoute = express.Router();

// add product page rendering and logic 
productRoute.get('/addProductPage', addProductPage);
productRoute.post('/addProduct', upload.single('product_image'), addProduct);

// view all product page route 
productRoute.get('/viewAllProductPage', viewAllProductPage);

// edit product page route and rendering and logic 
productRoute.get('/editProductPage', editProductPage);
productRoute.post('/editProduct/:productId', upload.single('product_image'), editProduct);

// to delete product
productRoute.get('/deleteProduct/:productId', deleteProduct);

module.exports = productRoute;