const express = require('express');
const passport = require('passport');


const { dashboardPage, loginPage, checkLogin, logout, changePasswordPage, changePassword, profilePage, verifyEmail, OTPPage, OTPVerify, newPasswordPage, changeNewPassword } = require('../controllers/admin.controller');

const route = express.Router();

// Auth
route.get('/', passport.checknotdone, loginPage);
route.post('/login', passport.checknotdone, passport.authenticate("localadmin", {
    failureRedirect: "/",
}), checkLogin);

// change password
route.get('/change-password', passport.checkdone, changePasswordPage);
route.post('/change-password', passport.checkdone, changePassword);

// forgot password
route.post('/verify-email', passport.checknotdone, verifyEmail);

// OTP Page
route.get('/otp-page', passport.checknotdone, OTPPage);
route.post('/otp-verify', passport.checknotdone, OTPVerify);

// New Password Page
route.get('/newPasswordPage', passport.checknotdone, newPasswordPage);
route.post('/change-new-password', passport.checknotdone, changeNewPassword);

// Profile
route.get('/profile', passport.checkdone, profilePage);

// logout
route.get('/logout', passport.checkdone, logout);

route.get('/dashboard', passport.checkdone, dashboardPage);

route.use('/admin', passport.checkdone, require('./admin.js'));


// category route

route.use('/category', passport.checkdone, require('./category.js'));

module.exports = route;