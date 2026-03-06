const Category = require('../models/categories.model');
const SubCategory = require('../models/subcategories.model');
const ExtraCategory = require('../models/extracategories.model');
const Product = require('../models/product.model');

const fs = require('fs');

// add product page rendering 
module.exports.addProductPage = async (req, res) => {
    try {
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();

        return res.render('products/addProductPage', { allCategory, allSubCategory, allExtraCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// add product logic 
module.exports.addProduct = async (req, res) => {
    try {
        req.body.product_image = req.file.path;

        const newProduct = await Product.create(req.body);

        if (!newProduct) {
            req.flash('error', "Product insertion failed");
            return res.redirect('/product/addProductPage');
        }

        req.flash('success', "Product inserted successfully");
        return res.redirect('/product/addProductPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// all product view page controller 
module.exports.viewAllProductPage = async (req, res) => {
    try {
        const allProducts = await Product.find().populate('category_id').populate('sub_category_id').populate('extra_category_id');

        if (!allProducts) {
            req.flash('error', "Products not fetched");
            return res.redirect('/product/addProductPage');
        }

        return res.render('products/viewAllProductPage', { allProducts });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// edit page logic 
module.exports.editProductPage = async (req, res) => {
    try {
        const editProduct = await Product.findById(req.query.productId);

        if (!editProduct) {
            req.flash('error', "Something went wrong");
            return res.redirect('/product/viewAllProductPage');
        }

        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();
        const allExtraCategory = await ExtraCategory.find();

        const filteredAllSubCategory = await SubCategory.find({
            category_id: editProduct.category_id
        });

        const filteredAllExtraCategory = await ExtraCategory.find({
            sub_category_id: editProduct.sub_category_id
        });

        return res.render('products/editProductPage', {
            editProduct,
            allCategory,
            allSubCategory,
            allExtraCategory,
            filteredAllSubCategory,
            filteredAllExtraCategory
        });

    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
};

module.exports.editProduct = async (req, res) => {
    try {
        if (req.file) req.body.product_image = req.file.path;

        const updatedData = await Product.findByIdAndUpdate(req.params.productId, req.body);

        if (req.file) fs.unlink(updatedData.product_image, () => { });

        if (!updatedData) {
            req.flash('error', "Data updation failed");
            return res.redirect('/product/viewAllProductPage');
        }

        req.flash('success', "Product updated successfully");
        return res.redirect('/product/viewAllProductPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// to delete product 
module.exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.productId);

        if (!deletedProduct) {
            req.flash('error', "Product not deleted");
            return res.redirect('/product/viewAllProductPage');
        }

        fs.unlink(deletedProduct.product_image, () => { })

        req.flash('success', "Product deleted successfully");
        return res.redirect('/product/viewAllProductPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}