const express = require('express');
const route = express.Router();

// @route   GET api/users
// @desc    Test route
// @access  Public
route.use('/', (req, res) => {
  res.status(200).send({ message: 'teste users' });
});

module.exports = route;
