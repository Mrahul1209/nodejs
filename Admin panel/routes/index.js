const express = require('express');
const { addminForm } = require('../controllers/admin.controller');

const route = express.Router();

route.get('/', addminForm);


module.exports = route;
