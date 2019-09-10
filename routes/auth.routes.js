const express = require('express');
const route = express.Router();
const auth = require('./../middleware/auth.middleware');

const authController = require('./../_controllers/auth.controller');

// @route   Post api/auth/register
// @desc    Register user
// @access  Public
route.post('/register', authController.register);

// @route   Post api/auth/login
// @desc    Login user
// @access  Public
route.post('/login', authController.login);

// @route   GET api/auth
// @desc    Take user info
// @access  Public
route.get('/', auth, authController.user_info);

module.exports = route;
