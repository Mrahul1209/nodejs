const Category = require('../models/categories.model');
const fs = require('fs');

// add category page rendering 
module.exports.addCategoryPage = (req, res) => {
    return res.render('categories/addCategoryPage');
}

// add category logic 
module.exports.addCategory = async (req, res) => {
    try {
        console.log(req.file);

        req.body.category_image = req.file.path;

        const newCategory = await Category.create(req.body);

        if (newCategory) {
            req.flash('success', "Category added successfully");
        }

        return res.redirect('/category/addCategoryPage');
    }
    catch (err) {
        console.log(err);
    }
}

// all category view page 
module.exports.allCategoryViewPage = async (req, res) => {
    try {
        const allCategory = await Category.find();

        return res.render('categories/allCategoryViewPage', { allCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", error);
    }
}

// delete category logic 
module.exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId);

        fs.unlink(deletedCategory.category_image, () => { });

        if (deletedCategory) {
            req.flash('success', `${deletedCategory.category_name} is successfully deleted`);
        }

        return res.redirect('/category/allCategoryViewPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", error);
    }
}

// edit category page 
module.exports.editCategory = async (req, res) => {
    try {
        const editCategory = await Category.findById(req.params.categoryId);

        return res.render('categories/editCategoryPage', { editCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", error);
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.category_image = req.file.path;
        }

        const updatedData = await Category.findByIdAndUpdate(req.params.categoryId, req.body);

        if (req.file) {
            fs.unlink(updatedData.category_image, () => { });
        }

        if (!updatedData) {
            req.flash('error', "Data not updated...");
        }

        req.flash('success', "Data updated successfully");
        return res.redirect('/category/allCategoryViewPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}