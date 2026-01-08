const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phone: String,
    gender: String,
    hobby: Array,
    city: String,
    about: String,
    image: String
});

module.exports = mongoose.model('Admin', adminSchema, 'Admin');