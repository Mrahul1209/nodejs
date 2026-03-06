const Admin = require('../model/admin.model');
const fs = require('fs');
const nodemailer = require('nodemailer');


// session

function session(req, res) {
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('admin');
            return res.redirect('/');
        }
        console.log("error", err);
    });

}

// Login Page
module.exports.loginPage = async (req, res) => {
    try {
        return res.render('auth/login');
    } catch (err) {
        console.log("Something is mistak");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Login 
module.exports.checkLogin = async (req, res) => {
    try {
        req.flash('success', 'Login Successfully..');
        return res.redirect('/dashboard');
    } catch (err) {
        req.flash('error', 'Something went wrong');
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change Password Page
module.exports.changePasswordPage = async (req, res) => {
    try {
        return res.render('auth/changePasswordPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}
// Change Password 
module.exports.changePassword = async (req, res) => {
    try {

        let admin = res.locals.admin;
        console.log(req.body);

        const { current_psw, new_psw, conform_psw } = req.body;

        if (current_psw !== admin.password) {
            req.flash('error', 'curent Password and old Password are not match...');
            console.log("curent Password and old Password are not match...");
            return res.redirect('/change-password');
        }

        if (new_psw === admin.password) {
            req.flash('error', 'new Password and old Password are same!!!!...');
            console.log("new Password and old Password are same!!!!...");
            return res.redirect('/change-password');
        }

        if (new_psw !== conform_psw) {
            req.flash('error', 'new Password and conform Password are not match!!!!!...');
            console.log("new Password and conform Password are not match!!!!!...");
            return res.redirect('/change-password');
        }

        // Update  Password
        const adminChangePassword = await Admin.findByIdAndUpdate(admin._id, { password: new_psw }, { new: true });

        if (adminChangePassword) {
            req.flash('success', 'Password changed successfully..');
            console.log("Password changed...");
            session(req, res);


        } else {
            req.flash('error', 'Password not changed..');
            console.log("Password not changed...");
            return res.redirect('/dashboard');
        }

    } catch (err) {
        req.flash('error', 'Something went wrong');
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Verify email
module.exports.verifyEmail = async (req, res) => {

    console.log(req.body);

    try {
        const myAdmin = await Admin.findOne(req.body);

        if (!myAdmin) {
            req.flash('error', 'Admin not found with this email..');
            console.log("Admin not found....");
            return res.redirect('/');
        }

        // Send otp
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
                    <p> OTP : ${OTP} </p>`,
        });

        console.log(info.messageId);

        res.cookie("OTP", OTP);
        res.cookie("id", myAdmin._id);

        return res.redirect('/otp-page');

    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP Page
module.exports.OTPPage = (req, res) => {
    try {
        if (!req.cookies.OTP) {
            return res.redirect('/');
        }
        return res.render('auth/OTPPage');
    } catch (err) {
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// OTP 
module.exports.OTPVerify = async (req, res) => {
    try {
        console.log("User Side : ", req.body);
        console.log("Developer Side : ", req.cookies);

        if (req.body.adminOTP !== req.cookies.OTP) {
            console.log("otp not match!!!!...");
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
        if (!req.cookies.id) {
            return res.redirect('/');
        }
        return res.render('auth/newPasswordPage');
    } catch (err) {
        console.log("Something went wrong....!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Change  Password Logic
module.exports.changeNewPassword = async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.new_password !== req.body.conform_password) {
            console.log("New and Conform Password not match!!!!!!!!!");
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
        console.log("Something went wrong!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Profile Page
module.exports.profilePage = async (req, res) => {
    try {
        return res.render('profile/profilePage');
    } catch (err) {
        console.log("Something went wrong!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

//Logout
module.exports.logout = (req, res) => {
    session(req, res);
}

// Dashboard
module.exports.dashboardPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminId);

        return res.render('dashboard');
    } catch (err) {
        console.log("Something went wrong!!!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/');
    }
}

// Add Admin Page
module.exports.addAdminPage = async (req, res) => {

    try {
        return res.render('admin/addAdminPage');
    } catch (err) {
        console.log("Something went wrong!!!!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/dashboard');
    }
}

// View Admin 
module.exports.viewAdminPage = async (req, res) => {
    try {

        let allAdmin = await Admin.find();

        console.log(allAdmin);

        allAdmin = allAdmin.filter((subadmin) => subadmin.email != res.locals.admin.email);

        return res.render('admin/viewAdminPage', { allAdmin });
    } catch (err) {
        console.log("Something went wrong!!!!!!!!!!!");
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
            req.flash('success', 'Admin Inserted Successfully..');
            console.log("Admin Inserted Successfully..");

        } else {
            req.flash('error', 'Admin Insertion Failed..');
            console.log("Admin Insertion Failed..");
        }
        return res.redirect('/admin/addAdminPage');
    } catch (err) {
        req.flash('error', 'Something went wrong');
        console.log("Something went wrong!!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/admin/addAdminPage');
    }
}

// Delete Admin
module.exports.deleteAdmin = async (req, res) => {
    try {

        const deletedUser = await Admin.findByIdAndDelete(req.query.adminId);

        console.log(deletedUser);

        if (deletedUser) {
            fs.unlink(deletedUser.profile_image, () => { });
            req.flash("success", "Admin deleted successfully...");
            console.log("Admin deleted succes!!!!!!!!");
        } else {
            req.flash('error', "Admin deletion failed...");
            console.log("Admin deletion failed...");
        }

        return res.redirect('/admin/viewAdminPage');

    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong");
        console.log("Error : ", err);
        return res.redirect('/admin/viewAdminPage');
    }
}

// Update Admin 
module.exports.editAdminPage = async (req, res) => {
    try {
        console.log(req.params);

        const singleAdmin = await Admin.findById(req.params.adminId);

        return res.render('admin/editAdminPage', { singleAdmin });

    } catch (err) {
        console.log("Something went wrong!!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/admin/viewAdminPage');
    }
}

// Update Admin
module.exports.updateAdmin = async (req, res) => {
    try {
        console.log("Params: ", req.params);
        console.log(req.body);
        console.log(req.file);

        if (req.file) {

            req.body.profile_image = req.file.path;

            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body);

            if (updatedData) {
                fs.unlink(updatedData.profile_image, () => { });
                req.flash('success', "Admin Updated Successfully...");
                console.log("Admin Updated Succes!!...");
            } else {
                req.flash('error', "Admin Updation Failed...");
                console.log("Admin Updation Failed...");
            }
        } else {
            const updatedData = await Admin.findByIdAndUpdate(req.params.adminId, req.body, { new: true });

            if (updatedData) {
                req.flash('success', `${updatedData.fname} ${updatedData.lname} Updated Successfully...`);
                console.log("Admin Updated Succes...");
            } else {
                req.flash('error', "Admin Updation Failed...");
                console.log("Admin Updation Failed...");
            }
        }

        return (req.params.adminId === res.locals.admin.id) ? res.redirect('/profile') : res.redirect('/admin/viewAdminPage');
    } catch (err) {
        req.flash('error', "Something went wrong");
        console.log("Something went wrong!!!!!!!!!!!");
        console.log("Error : ", err);
        return res.redirect('/admin/viewAdminPage');
    }
}