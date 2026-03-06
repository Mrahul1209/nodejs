const mongoose = require('mongoose');

const subCategoriesSchema = mongoose.Schema({
    sub_category_name: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    }
});

module.exports = mongoose.model('SubCategory', subCategoriesSchema, 'SubCategory');