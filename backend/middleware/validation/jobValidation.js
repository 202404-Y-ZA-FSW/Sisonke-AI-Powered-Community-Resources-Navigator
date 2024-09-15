const { check } = require('express-validator');

const jobValidationRules = [
  // Job title validation
  check('title')
    .notEmpty().withMessage('Job title is required.')
    .isString().withMessage('Job title must be a string.'),
  
  // Company name validation
  check('company')
    .notEmpty().withMessage('Company is required.')
    .isString().withMessage('Company must be a string.'),
  
  // Location validation
  check('location')
    .notEmpty().withMessage('Location is required.')
    .isString().withMessage('Location must be a string.'),
  
  // Job type validation
  check('type')
    .notEmpty().withMessage('Job type is required.')
    .isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'learnership'])
    .withMessage('Invalid job type.'),

  // Salary validation
  check('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number.'),

  // Description validation
  check('description')
    .notEmpty().withMessage('Description is required.')
    .isString().withMessage('Description must be a string.'),

  // Qualifications validation
  check('qualifications')
    .optional()
    .isArray().withMessage('Qualifications must be an array.')
    .custom((value) => value.every((q) => typeof q === 'string'))
    .withMessage('Each qualification must be a string.'),

  // Experience level validation
  check('experience')
    .optional()
    .isIn(['entry-level', 'mid-level', 'senior-level'])
    .withMessage('Invalid experience level.'),

  // Required skills validation
  check('skills')
    .optional()
    .isArray().withMessage('Required skills must be an array.')
    .custom((value) => value.every((s) => typeof s === 'string'))
    .withMessage('Each required skill must be a string.'),
]

module.exports = jobValidationRules;
