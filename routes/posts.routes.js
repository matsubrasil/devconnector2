const express = require('express');
const route = express.Router();

// @route   GET api/posts
// @desc    Test route
// @access  Public
route.use('/', (req, res) => {
  res.status(200).send({ message: 'teste posts' });
});

module.exports = route;
