const express = require('express');
const upload = require('../middalware/multer.middal');
const { addAdminPage, viewAdminPage, insertAdmin, deleteAdmin, editAdminPage, updateAdmin } = require('../controllers/admin.controller');

const admin = express.Router();

admin.get('/addAdminPage', addAdminPage);
admin.get('/viewAdminPage', viewAdminPage);

// Insert Admin
admin.post('/insertAdmin', upload.single('profile_image'), insertAdmin);

// Delete Admin
admin.get('/deleteAdmin/:adminId', deleteAdmin);

// Edit Admin
admin.get('/editAdmin/:adminId', editAdminPage);
admin.post('/editAdmin/:adminId', upload.single('profile_image'), updateAdmin);

module.exports = admin; 