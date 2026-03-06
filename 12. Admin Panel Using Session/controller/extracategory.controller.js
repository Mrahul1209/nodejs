const Category = require('../models/categories.model');
const SubCategory = require('../models/subcategories.model');
const ExtraCategory = require('../models/extracategories.model');

// rendering add extra category page 
module.exports.addExtraCategoryPage = async (req, res) => {
    try {
        const allCategory = await Category.find();

        const allSubCategory = await SubCategory.find();

        console.log("All category : ", allCategory);
        console.log("All sub category : ", allSubCategory);

        return res.render('extracategories/addExtraCategoriesPage', { allCategory, allSubCategory })
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
};

// adding extra category logic 
module.exports.addExtraCategory = async (req, res) => {
    try {
        const newExtraCategory = await ExtraCategory.create(req.body);

        if (!newExtraCategory) {
            req.flash('error', "Extra category insertion failed");
            return res.redirect('/extraCategory/addExtraCategoryPage');
        }

        req.flash('success', `${newExtraCategory.extra_category_name} is added successfully`);
        return res.redirect('/extraCategory/addExtraCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
};

// view all extra category page rendering and logic 
module.exports.viewAllExtraCategory = async (req, res) => {
    try {
        const allExtraCategories = await ExtraCategory.find().populate('category_id').populate('sub_category_id');

        return res.render('extracategories/allExtraCategoriesViewPage', { allExtraCategories });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
};

// delete extra category 
module.exports.deleteExtraCategory = async (req, res) => {
    try {
        const deletedExtraCategory = await ExtraCategory.findByIdAndDelete(req.params.extraCategoryId);

        if (!deletedExtraCategory) {
            req.flash('error', "Extra category deletion failed");
            return res.redirect('/extraCategory/viewAllExtraCategoryPage');
        }

        req.flash('success', `${deletedExtraCategory.extra_category_name} deleted successfully`);
        return res.redirect('/extraCategory/viewAllExtraCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// edit extra category 
module.exports.editExtraCategory = async (req, res) => {
    try {
        const editExtraCategory = await ExtraCategory.findById(req.query.extraCategoryId).populate('category_id').populate('sub_category_id');
        const allCategory = await Category.find();
        const allSubCategory = await SubCategory.find();

        const filteredAllSubCategory = allSubCategory.filter(sub =>
            sub.category_id.toString() === editExtraCategory.category_id._id.toString()
        );

        if (!editExtraCategory) {
            req.flash('error', "Extra category not edited");
            return res.redirect('/extraCategory/viewAllExtraCategoryPage')
        }

        return res.render('extracategories/editExtraCategoriesPage', { editExtraCategory, allCategory, allSubCategory, filteredAllSubCategory });
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}

// update extra category 
module.exports.updateExtraCategory = async (req, res) => {
    try {
        const updatedCategory = await ExtraCategory.findByIdAndUpdate(req.params.extraCategoryId, req.body, { new: true });

        if (!updatedCategory) {
            req.flash('error', "Category not updated");
            return res.redirect('/extraCategory/editExtraCategoryPage')
        }

        req.flash('success', `${updatedCategory.extra_category_name} updated successfully`);
        return res.redirect('/extraCategory/viewAllExtraCategoryPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Error : ", err);
    }
}