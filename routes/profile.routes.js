const express = require('express');
const route = express.Router();
const profileController = require('./../_controllers/profile.controller');
const auth = require('./../middleware/auth.middleware');

// @route   GET api/profile/me
// @desc    Get current user profile
// @access  Private

route.delete('/', auth, profileController.delete);
route.get('/me', auth, profileController.profile);
route.get('/', profileController.all);
route.post('/', auth, profileController.create);
route.put('/', auth, profileController.update);
route.get('/user/:user_id', profileController.profileByUser);
route.post('/experience', auth, profileController.addExperience);
route.delete(
  '/experience/:id_experience',
  auth,
  profileController.deleteExperience,
);
route.get('/experience/me', auth, profileController.getExperience);
route.post('/education', auth, profileController.addEducation);
route.delete(
  '/education/:id_education',
  auth,
  profileController.deleteEducation,
);
route.get('/education/me', auth, profileController.getEducation);
route.get('/github/:username', auth, profileController.getGithub);
module.exports = route;
