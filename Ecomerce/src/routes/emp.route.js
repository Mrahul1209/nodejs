const express = require('express');
const { addEmp, fetchAllEmp, DeleteEmp } = require('../controller/emp.controller');

const empRoute = express.Router();

empRoute.post('/addemp', addEmp);

empRoute.get('/fetchemp', fetchAllEmp);

empRoute.delete('/deleteemp', DeleteEmp);

module.exports = empRoute;