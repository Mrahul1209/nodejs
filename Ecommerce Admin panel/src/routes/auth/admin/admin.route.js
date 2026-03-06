const express = require('express');
const { register, login } = require('../../../controller/auth/admin/admin.controller');

const adminRoute = express.Router();

adminRoute.post('/register', register);
adminRoute.post('/login', login);

module.exports = adminRoute;