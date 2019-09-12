const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  // data.website = !isEmpty(data.website) ? data.website : '';
  // data.location = !isEmpty(data.location) ? data.location : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  // data.company = !isEmpty(data.company) ? data.company : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';
  // data.bio = !isEmpty(data.bio) ? data.bio : '';
  // data.githubusername = !isEmpty(data.githubusername)
  //   ? data.githubusername
  //   : '';

  if (Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required';
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required';
  }
  console.log('errors => ', errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
