const mongoose = require('mongoose');

const extraCategoriesSchema = mongoose.Schema({
    extra_category_name: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    }
});

module.exports = mongoose.model("ExtraCategory", extraCategoriesSchema, "ExtraCategory");