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
    //errors.push({ name: 'Nome field is required' });
    errors.name = 'Nome field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
    //errors.push({ email: 'Email is invalid' });
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
    //errors.push({ email: 'Email field is required' });
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password minimun 6 characters and maximun 50 characters';
    // errors.push({
    //   password: 'Password minimun 6 characters and maximun 20 characters',
    // });
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';

    //errors.push({ password: 'Password field is required' });
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Confirm password no match';
    // errors.push({ password: 'Confirm password no match' });
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm password field is required';
  }

  console.log('errors backend => ', errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
