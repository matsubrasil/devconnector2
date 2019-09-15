const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};
  // console.log('data-->', data);
  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.date_from = !isEmpty(data.date_from) ? data.date_from : '';

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = 'Company field is required';
  }

  if (Validator.isEmpty(data.date_from)) {
    errors.date_from = 'Date From field is required';
  }

  if (Validator.is) console.log('errors => ', errors);
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
