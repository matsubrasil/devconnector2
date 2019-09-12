const express = require('express');
const route = express.Router();
const userController = require('./../_controllers/user.controller');
const auth = require('./../middleware/auth.middleware');

// @route   GET api/users
// @desc    Take user info
// @access  Public
route.get('/', auth, userController.user_info);

module.exports = route;
