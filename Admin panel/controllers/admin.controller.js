const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId && admin) {
            return res.redirect('/dashboard');
        }

        return res.render('auth/login');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Login Logic
module.exports.checkLogin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin) {
            console.log("Admin not found...");
            return res.redirect('/');
        }

        if (admin.password != req.body.password) {
            console.log("Pasword not matched...");
            return res.redirect('/');
        }

        res.cookie('adminId', admin._id);
        return res.redirect('/dashboard');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change Password Page
module.exports.changePasswordPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('auth/changePasswordPage', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Change Password 
module.exports.changePassword = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        console.log(req.body);

        const { current_psw, new_psw, conform_psw } = req.body;

        if (current_psw !== admin.password) {
            console.log("Current Password and Old Password are not match...");
            return res.redirect('/change-password');
        }

        if (new_psw === admin.password) {
            console.log("New Password and Old Password are same...");
            return res.redirect('/change-password');
        }

        if (new_psw !== conform_psw) {
            console.log("New Password and Conform Password are not matched...");
            return res.redirect('/change-password');
        }

        // Update for Change Password
        const adminChangePassword = await Admin.findByIdAndUpdate(admin._id, { password: new_psw }, { new: true });

        if (adminChangePassword) {
            console.log("Password changed...");
            res.clearCookie('adminId');
        } else {
            console.log("Password not changed...");
        }

        return res.redirect('/dashboard');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Verify Email
module.exports.verifyEmail = async (req, res) => {

    console.log(req.body);

    try {
        const myAdmin = await Admin.findOne(req.body);

        if (!myAdmin) {
            console.log("Admin not found....");
            return res.redirect('/');
        }

        // Send OTP
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "rm0539649@gmail.com",
                pass: "ymxzjncbuhwucjcx"
            }
        });

        const OTP = Math.floor(100000 + Math.random() * 900000);

        const info = await transporter.sendMail({
            from: '"Admin Panel" <rm0539649@gmail.com>',
            to: req.body.email,
            subject: "OTP Verification",
            html: `<h2>Forgot Password OTP</h2>
                    <p> OTP : ${OTP} </p>`, // HTML version of the message
        });

        console.log(info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id);

        return res.redirect('/otp-page'); // OTP Verify Page

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Page
module.exports.OTPPage = (req, res) => {
    try {
        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Verify
module.exports.OTPVerify = async (req, res) => {
    try {
        console.log("User Side : ", req.body);
        console.log("Developer Side : ", req.cookies);

        if (req.body.adminOTP !== req.cookies.OTP) {
            console.log("OTP not match...");
            return res.redirect('/otp-page');
        }

        // Change Password
        return res.redirect('/newPasswordPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// New Password Page
module.exports.newPasswordPage = (req, res) => {
    try {
        res.clearCookie('OTP');
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change New Password Logic
module.exports.changeNewPassword = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.new_password !== req.body.conform_password) {
            console.log("New and Conform Password not matched");
            return res.redirect('/newPasswordPage');
        }

        console.log(req.cookies);

        const updatePassword = await Admin.findByIdAndUpdate(req.cookies.id, { password: req.body.new_password }, { new: true });

        res.clearCookie('id');
        if (updatePassword) {
            console.log("Password Update...");
            return res.redirect('/');
        } else {
            console.log("Password Not Update...");
            return res.redirect('/');
        }

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('profile/profilePage', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

//Logout
module.exports.logout = (req, res) => {
    res.clearCookie('adminId');
    return res.redirect('/');
}

// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('dashboard', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {

    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        return res.render('admin/addAdminPage', { admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// View Admin Page
module.exports.viewAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        let allAdmin = await Admin.find();

        allAdmin = allAdmin.filter((subadmin) => subadmin.email != admin.email);

        return res.render('admin/viewAdminPage', { allAdmin, admin });
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// Insert Admin
module.exports.insertAdmin = async (req, res) => {
    try {

        console.log(req.file);

        req.body.profile_image = req.file.path;

        const addAdmin = await Admin.create(req.body);

        if (addAdmin) {
            console.log("Admin Inserted Successfully..");
        } else {
            console.log("Admin Insertion Failed..");
        }
        return res.redirect('/addAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/addAdminPage');
    }
}

// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        console.log(deletedUser);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
            console.log("Admin deleted successfully...");
        } else {
            console.log("Admin deletion failed...");
        }

        return res.redirect('/viewAdminPage');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}

// Update Admin Page
module.exports.editAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        if (req.cookies.adminId == undefined && !admin) {
            return res.redirect('/');
        }

        console.log(req.params);

        const singleAdmin = await Admin.findById(req.params.adminId);

        return res.render('admin/editAdminPage', { singleAdmin, admin });

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}

// Update Admin
module.exports.updateAdmin = async (req, res) => {
    try {
        console.log("Params: ", req.params);
        console.log("Cookies: ", req.cookies);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile_image = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile_image, () => { });
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        } else {
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });

            if (updatedData) {
                console.log("Admin Updated Successfully...");
            } else {
                console.log("Admin Updation Failed...");
            }
        }

        return (req.params.adminId === req.cookies.adminId) ? res.redirect('/profile') : res.redirect('/viewAdminPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/viewAdminPage');
    }
}