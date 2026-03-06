const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    product_name: String,
    product_old_price: Number,
    product_price: Number,
    product_stock: Number,
    product_description: String,
    product_image: String,
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
    extra_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraCategory',
        required: true,
    }
})

module.exports = mongoose.model('Product', productSchema, 'Product');