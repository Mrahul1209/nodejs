const category = require('../model/categories.model');
const fs = require('fs');

module.exports.addCategoryPage = (req, res) => {
    const admin = res.locals.admin;
    return res.render("category/addCategoryPage", { admin, currentPath: req.originalUrl.split('?')[0] });
}

module.exports.viewCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const allCategory = await category.find();
        return res.render("category/viewcategoryPage", { admin, currentPath: req.originalUrl.split('?')[0], allCategory });

    } catch (error) {
        res.flash('error', 'Failed to view categories.');
        console.log("Something Went Wrong", error);
        res.redirect('/category/viewCategoryPage');
    }
}
module.exports.addcategory = async (req, res) => {
    try {
        req.body.category_img = req.file.path;
        const newCategory = await category.create(req.body);

        if (newCategory) {
            req.flash('success', 'Category added successfully!');
        } else {
            req.flash('error', 'Failed to add category.');
        }

        return res.redirect('/category/addCategoryPage');
    } catch (err) {
        req.flash('error', 'Failed to add admin. Please try again.');
        console.log("Something Went Wrong", err);
        res.redirect('/category/addCategoryPage');
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await category.findByIdAndDelete(req.params.id);

        if (deletedCategory) {
            fs.unlinkSync(deletedCategory.category_img, () => { });
            req.flash('success', 'Category deleted successfully!');
        } else {
            req.flash('error', 'Failed to delete category.');
        }

        return res.redirect('/category/viewCategoryPage');

    } catch (error) {
        req.flash('error', 'Failed to delete category. Please try again.');
        console.log("Something Went Wrong", error);
        res.redirect('/category/viewCategoryPage');
    }
}

module.exports.editCategoryPage = async (req, res) => {
    try {
        const admin = res.locals.admin;
        const categoryData = await category.findById(req.params.id);

        if (!categoryData) {
            req.flash('error', 'Category not found.');
            return res.redirect('/category/viewCategoryPage');
        }
        return res.render("category/editcategoryPage", { admin, currentPath: req.originalUrl.split('?')[0], categoryData });
    } catch (error) {
        req.flash('error', 'Failed to load category data. Please try again.');
        console.log("Something Went Wrong", error);
        res.redirect('/category/viewCategoryPage');
    }
}

module.exports.editCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.category_img = req.file.path;
        }

        const updatedCategory = await category.findByIdAndUpdate(req.params.id, req.body);

        if (updatedCategory) {
            if (req.file) {
                fs.unlinkSync(updatedCategory.category_img, () => { });
            }
            req.flash('success', 'Category updated successfully!');
        } else {
            req.flash('error', 'Failed to update category.');
        }

        return res.redirect('/category/viewCategoryPage');
    } catch (error) {
        req.flash('error', 'Failed to update category image. Please try again.');
        console.log("Something Went Wrong", error);
        res.redirect('/category/viewCategoryPage');
    }

}