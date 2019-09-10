const express = require('express');
const route = express.Router();
const auth = require('./../middleware/auth.middleware');

const authController = require('./../_controllers/auth.controller');

// @route   Post api/auth/register
// @desc    Register user
// @access  Public
route.post('/register', authController.register);

// @route   GET api/auth
// @desc    Test route
// @access  Public
route.get('/', auth, authController.test);

module.exports = route;
