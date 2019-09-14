const express = require('express');
const route = express.Router();
const profileController = require('./../_controllers/profile.controller');
const auth = require('./../middleware/auth.middleware');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private
route.get('/me', auth, profileController.profile);
route.get('/', profileController.all);
route.post('/', auth, profileController.create);
route.put('/', auth, profileController.update);
route.get('/user/:user_id', profileController.profileByUser);
route.delete('/', auth, profileController.delete);
route.post('/experience', auth, profileController.experience);
module.exports = route;
