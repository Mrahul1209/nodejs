const fs = require('fs');
const Employee = require("../models/employee.model");


const employeeform = (req, res) => {
    console.log("Hello World");

    return res.render('employeeform');
}

// Insert Employee
const addEmployee = async (req, res) => {

    try {
        console.log(req.file);
        req.body.profile_image = req.file.path;

        const addEmployee = await Employee.create(req.body);

        if (addEmployee) {
            console.log("Employee inserted succussfully!!!!.");
        } else {
            console.log("Employee insertion failed!!...");
        }

        return res.redirect('/allEmployeePage');
    } catch (e) {
        console.log(e);
        console.log(e.message);
        return res.redirect('/allEmployeePage');
    }
}

// All Employee
const allEmployeePage = async (req, res) => {

    try {
        const allEmployee = await Employee.find();

        return res.render('allemployee', { allEmployee });
    } catch (e) {
        console.log(e);
        console.log(e.message);
        return res.redirect('/');
    }
}


// Delete Employee
const deleteEmployee = async (req, res) => {

    console.log(req.query);

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.query.employeeId);


        if (deletedEmployee) {
            fs.unlink(deletedEmployee.profile_image, () => { })
            console.log("Employee deleted successfully...");
        } else {
            console.log("Employee deletion failed...");
        }

        return res.redirect('/allEmployeePage');
    } catch (e) {
        console.log(e);
        console.log(e.message);
        return res.redirect('/deletemployee');
    }
}

// Edit Page Render
const editEmployeePage = async (req, res) => {
    console.log(req.params);

    try {
        const singleEmp = await Employee.findById(req.params.empId);


        return res.render('updateemployeepage', { singleEmp });
    } catch (e) {
        console.log(e);
        console.log(e.message);
        return res.redirect('/employee/allEmployeePage');
    }

}

const updateEmployee = async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    try {
        const { emp_id } = req.body;

        // 🔹 Old employee data lao
        const oldEmployee = await Employee.findById(emp_id);

        let updatedData = req.body;

        // 🔹 Agar nayi image aayi hai
        if (req.file) {

            // 👉 purani image delete
            if (oldEmployee.profile_image) {
                fs.unlink(oldEmployee.profile_image, (err) => {
                    if (err) console.log(err);
                });
            }

            // 👉 nayi image path save
            updatedData.profile_image = req.file.path;
        }

        // 🔹 Update employee
        await Employee.findByIdAndUpdate(emp_id, updatedData);

        console.log("Employee updated successfully...");
        return res.redirect('/allEmployeePage');

    } catch (e) {
        console.log(e);
        return res.redirect('/allEmployeePage');
    }
};




module.exports = {
    employeeform,
    addEmployee,
    allEmployeePage,
    deleteEmployee,
    editEmployeePage,
    updateEmployee

}