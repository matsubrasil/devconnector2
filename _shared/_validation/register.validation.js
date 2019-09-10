const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data.name);

  data.name = !isEmpty(data.name) ? data.name : '';

  console.log('data.nome:', data.name);
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Nome field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = 'Confirm password no match';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 9 })) {
    errors.password = 'Password minimun 6 characters and maximun 9 characters';
  }
  console.log('errors => ', errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
