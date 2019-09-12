const express = require('express');
const route = express.Router();

const authController = require('./../_controllers/auth.controller');

// @route   Post api/auth/register
// @desc    Register user
// @access  Public
route.post('/register', authController.register);

// @route   Post api/auth/login
// @desc    Login user
// @access  Public
route.post('/login', authController.login);

module.exports = route;
