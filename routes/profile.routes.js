const express = require('express');
const route = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
route.use('/', (req, res) => {
  res.status(200).send({ message: 'teste profile' });
});

module.exports = route;
