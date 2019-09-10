const express = require('express');
const route = express.Router();
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const profileRoutes = require('./profile.routes');
const postsRoutes = require('./posts.routes');

route.use('/users', usersRoutes);
route.use('/auth', authRoutes);
route.use('/profile', profileRoutes);
route.use('/posts', postsRoutes);

route.use('/', (req, res) => {
  res.status(200).send({ message: 'testefsfs' });
});

module.exports = route;
