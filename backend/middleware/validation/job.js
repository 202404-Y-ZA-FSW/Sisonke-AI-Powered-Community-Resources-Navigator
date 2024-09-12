const { body } = require('express-validator');

const jobValidationRules = () => [
  // Validate the job title
  body('title')
    .notEmpty().withMessage('Job title is required.')
    .isString().withMessage('Job title must be a string.'),
  
  // Validate the company
  body('company')
    .notEmpty().withMessage('Company is required.')
    .isString().withMessage('Company must be a string.'),
  
  // Validate location
  body('location')
    .notEmpty().withMessage('Location is required.')
    .isString().withMessage('Location must be a string.'),
  
  // Validate the job type
  body('jobType')
    .notEmpty().withMessage('Job type is required.')
    .isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'learnership'])
    .withMessage('Invalid job type.'),

  // Validate the salary 
  body('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number.'),

  // Validate description
  body('description')
    .notEmpty().withMessage('Description is required.')
    .isString().withMessage('Description must be a string.'),

  // Validate qualifications 
  body('qualifications')
    .optional()
    .isArray().withMessage('Qualifications must be an array.')
    .custom((value) => value.every((q) => typeof q === 'string'))
    .withMessage('Each qualification must be a string.'),

  // Validate experience level
  body('experienceLevel')
    .optional()
    .isIn(['entry-level', 'mid-level', 'senior-level'])
    .withMessage('Invalid experience level.'),

  // Validate education     
  body('education')
    .optional()
    .isArray().withMessage('Education must be an array.')
    .custom((value) => value.every((e) => typeof e === 'string'))
    .withMessage('Each education entry must be a string.'),

  // Validate required skills
  body('requiredSkills')
    .optional()
    .isArray().withMessage('Required skills must be an array.')
    .custom((value) => value.every((s) => typeof s === 'string'))
    .withMessage('Each required skill must be a string.'),

  // Validate link
  body('link')
    .isString().withMessage('Link must be a string.')
    .matches(/^(ftp|http|https):\/\/[^ "]+$/, 'i')
    .withMessage('Invalid URL'),
];

module.exports = { jobValidationRules };
