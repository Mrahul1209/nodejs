const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    Employee_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    hobby: {
        type: [String],
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    Department: {
        type: String,
        required: true,
    },
    profile_image: String,

});

module.exports = mongoose.model("Employee", employeeSchema, "Employee");