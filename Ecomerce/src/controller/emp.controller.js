const Employee = require('../model/employee.model');

module.exports.addEmp = async (req, res) => {
    try {
        console.log(req.body);

        const employee = await Employee.create(req.body);

        if (!employee) {
            return res.status(400).json({ status: 400, error: true, msg: "Failed to add employee" });
        }

        return res.status(200).json({ status: 200, error: false, msg: "Employee Added Successfully", employee });
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ status: 500, error: true, msg: "Internal Server Error" });
    }
}

module.exports.fetchAllEmp = async (req, res) => {
    try {

        const employee = await Employee.find();

        if (!employee) {
            return res.status(400).json({ status: 400, error: true, msg: "Failed to fetch employees" });
        }

        return res.status(200).json({ status: 200, error: false, msg: "Employee Fetched Successfully", employee });
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ status: 500, error: true, msg: "Internal Server Error" });
    }
}


module.exports.DeleteEmp = async (req, res) => {
    try {

        const employee = await Employee.findByIdAndDelete(req.query.id);
        if (!employee) {
            return res.status(400).json({ status: 400, error: true, msg: "Failed to delete employee" });
        }

        return res.status(200).json({ status: 200, error: false, msg: "Employee deleted Successfully", });
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ status: 500, error: true, msg: "Internal Server Error" });
    }
} 