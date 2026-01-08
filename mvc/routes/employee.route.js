const multer = require('multer');
const express = require('express');
const { addEmployee, employeeform, allEmployeePage, deleteEmployee, editEmployeePage, updateEmployee } = require("../controllers/employee.controller");

const emproute = express.Router();

emproute.get('/', employeeform);                           // Add Employee form

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const uploads = multer({ storage });

emproute.post('/addEmployee', uploads.single('profile_image'), addEmployee);                // Insert Employee
emproute.get('/allEmployeePage', allEmployeePage);         // View all employees
emproute.get('/deletemployee', deleteEmployee);            // Delete employee
emproute.get('/editEmployeePage/:empId', editEmployeePage); // Render edit page
emproute.post('/updateEmp', uploads.single('profile_image'), updateEmployee);              // Handle update form


module.exports = emproute;
