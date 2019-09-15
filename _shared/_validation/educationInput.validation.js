const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let errors = {};
  // console.log('data-->', data);
  data.school = !isEmpty(data.school) ? data.school : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
  data.date_from = !isEmpty(data.date_from) ? data.date_from : '';

  if (Validator.isEmpty(data.school)) {
    errors.school = 'School field is required';
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = 'Degree field is required';
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = 'Fieldofstudy field is required';
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

// school VARCHAR(100) NOT NULL,
//   degree VARCHAR(100) NOT NULL,
//   fieldofstudy VARCHAR(100) NOT NULL,
//   date_from DATE NOT NULL,
