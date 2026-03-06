const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: String,
    email: String,
    age: String,
    phone: String,
    gender: String,
    address: String,
});

module.exports = mongoose.model("Employee", employeeSchema, "Employee");