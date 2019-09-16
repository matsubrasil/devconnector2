const express = require('express');
const route = express.Router();
const auth = require('./../middleware/auth.middleware');
const postController = require('./../_controllers/postController');

// @route   GET api/posts
// @desc    Test route
// @access  Public
route.post('/', auth, postController.createPost);
route.get('/', auth, postController.allPosts);
route.get('/:id', auth, postController.postsById);
route.delete('/:id', auth, postController.deletePost);
route.post('/like/:id', auth, postController.likePost);
route.delete('/unlike/:id', auth, postController.unlikePost);

module.exports = route;
