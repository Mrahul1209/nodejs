const Category = require('../models/categories.model');
const SubCategory = require('../models/subcategories.model');

// add sub category page rendering 
module.exports.addSubCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find();

        console.log(allCategory);

        return res.render('subcategories/addSubCategoryPage', { allCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// add sub category logic 
module.exports.addSubCategory = async (req, res) => {
    try {
        const newSubCategory = await SubCategory.create(req.body);

        if (newSubCategory) {
            req.flash('success', "Sub Category Insertion Successfull");
        }
        else {
            req.flash('error', "Sub Category Insertion Failed");
        }

        return res.redirect('/subCategory/addSubCategoryPage')
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// view all category page rendering 
module.exports.viewSubCategoryPage = async (req, res) => {
    try {
        const allSubCategory = await SubCategory.find().populate('category_id');

        console.log(allSubCategory)

        return res.render('subcategories/allSubCategoryViewPage', { allSubCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// edit sub category page logic 
module.exports.editSubCategoryPage = async (req, res) => {
    try {
        const editSubCategory = await SubCategory.findById(req.params.subCategoryId).populate('category_id');
        const allCategory = await Category.find();

        return res.render('subcategories/editSubCategoryPage', { editSubCategory, allCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// update sub category page logic 
module.exports.updateSubCategory = async (req, res) => {
    try {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(req.params.subCategoryId, req.body);

        if (!updatedSubCategory) {
            req.flash('error', "Sub Category Not Updated");
            return res.redirect('/subCategory/viewSubCategoryPage')
        }

        req.flash('success', "Sub Category Updated Successfully");
        return res.redirect('/subCategory/viewSubCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// delete sub category
module.exports.deleteSubCategory = async (req, res) => {
    try {
        const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.subCategoryId);

        if (!deletedSubCategory) {
            req.flash('error', `${deletedSubCategory.sub_category_name} Deletion Failed`);
            return res.redirect('/subCategory/viewSubCategoryPage');
        }

        req.flash('success', `${deletedSubCategory.sub_category_name} Deletion Successfull`);
        return res.redirect('/subCategory/viewSubCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}