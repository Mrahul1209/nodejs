const express = require('express');
const { dashboard } = require('../controller/admin.controller');

const route = express.Router();

route.get('/', dashboard);

module.exports = route;