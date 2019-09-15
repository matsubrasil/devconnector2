const express = require('express');
const route = express.Router();
const auth = require('./../middleware/auth.middleware');
const postController = require('./../_controllers/postController');

// @route   GET api/posts
// @desc    Test route
// @access  Public
route.post('/', auth, postController.createPost);

module.exports = route;
