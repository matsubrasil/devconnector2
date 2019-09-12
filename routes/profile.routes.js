const express = require('express');
const route = express.Router();
const profileController = require('./../_controllers/profile.controller');
const auth = require('./../middleware/auth.middleware');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
route.get('/me', auth, profileController.profile);
route.post('/', auth, profileController.include);

module.exports = route;
