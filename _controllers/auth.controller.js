const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Pool } = require('pg');

const validateRegisterInput = require('./../_shared/_validation/register.validation');

const pool = new Pool();

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Public
const test = async (req, res) => {
  // Open connection
  const client = await pool.connect();
  const id = req.user.id;
  try {
    //See if user exists

    const txFindUser =
      'SELECT id, name, email, avatar, create_at FROM users WHERE id = $1';
    const params_id = [id];
    let result = await pool.query(txFindUser, params_id);

    console.log('result ==> ', result);
    const { name, email, avatar, create_at } = result.rows[0];
    console.log();
    return res
      .status(201)
      .send({ success: true, user1: { id, name, email, avatar, create_at } });
  } catch (e) {
    console.log({ err: e.message });
    return res.status(500).send({ success: false, error: 'Server Error' });
  }
};

// @route   GET api/auth/register
// @desc    Register new User
// @access  Public
const register = async (req, res) => {
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).send({ success: false, error: errors });
  }

  const { name, email, password } = req.body;

  // Open connection
  const client = await pool.connect();

  try {
    // See if user exists

    const txFindEmail = 'SELECT * FROM users WHERE email = $1';
    const params_email = [email];
    let result = await pool.query(txFindEmail, params_email);

    console.log('result ==> ', result.rowCount);

    if (result.rowCount === 1) {
      errors.email = 'User already registered!';
      return res.status(400).send({ success: false, errors });
    }

    // else {
    //   return res
    //     .status(200)
    //     .send({ success: true, message: 'Email not exists' });
    // }
    // Get users gravatar

    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    // password crypto
    const password_crypt = await bcrypt.hash(password, salt);

    // sql insert
    const txInsertUser =
      'INSERT INTO users(name, email, password, avatar) values ($1, $2, $3, $4) RETURNING *';
    const params_user = [name, email, password_crypt, avatar];

    result = await pool.query(txInsertUser, params_user);

    console.log('insert==>', result);

    const payload = {
      user: {
        id: result.rows[0].id,
      },
    };

    const token = await jwt.sign(payload, process.env.MYSECRET, {
      expiresIn: 3600,
    });

    return res.status(200).send({ success: true, token });

    // //return information
    // const newUser = {
    //   id: result.rows[0].id,
    //   name: result.rows[0].name,
    //   email: result.rows[0].email,
    // };
    // return res.status(201).send({ success: true, user: newUser });

    // Return jwt
  } catch (e) {
    console.error('error', e.message);
    return res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};

/*
const register = async (req, res) => {
  const client = await pool.connect();
  const { username, email, password, password2 } = req.body;
  const errors = {};
  // verify email
  const txFindEmail = 'SELECT * FROM users WHERE email = $1';
  const params_email = [email];

  try {
    let result = await pool.query(txFindEmail, params_email);

    console.log('result ==> ', result.rowCount);

    if (result.rowCount === 1) {
      errors.email = 'Email already exists';
      return res.status(400).send({ success: false, errors });
    }

    //
    const txInsertUser =
      'INSERT INTO users(username, email, password) values ($1, $2, $3) RETURNING *';
    const params_user = [username, email, password];
    result = await pool.query(txInsertUser, params_user);
    console.log('insert==>', result);
    const newUser = {
      id: result.rows[0].id,
      username: result.rows[0].username,
      email: result.rows[0].email,
    };
    res.status(201).send({ success: true, user: newUser });
  } catch (e) {
    res.status(500).send({ error: e.message });
  } finally {
    client.release();
  }
};
*/
const controller = {
  test,
  register,
};

module.exports = controller;
