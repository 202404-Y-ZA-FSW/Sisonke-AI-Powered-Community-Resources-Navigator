const { body } = require('express-validator');

// Validation rules for job listing inputs
const jobValidationRules = () => [
  // Job title validation
  body('title')
    .notEmpty().withMessage('Job title is required.')
    .isString().withMessage('Job title must be a string.'),
  
  // Company name validation
  body('company')
    .notEmpty().withMessage('Company is required.')
    .isString().withMessage('Company must be a string.'),
  
  // Location validation
  body('location')
    .notEmpty().withMessage('Location is required.')
    .isString().withMessage('Location must be a string.'),
  
  // Job type validation
  body('jobType')
    .notEmpty().withMessage('Job type is required.')
    .isIn(['full-time', 'part-time', 'contract', 'freelance', 'internship', 'learnership'])
    .withMessage('Invalid job type.'),

  // Salary validation
  body('salary')
    .optional()
    .isNumeric().withMessage('Salary must be a number.'),

  // Description validation
  body('description')
    .notEmpty().withMessage('Description is required.')
    .isString().withMessage('Description must be a string.'),

  // Qualifications validation
  body('qualifications')
    .optional()
    .isArray().withMessage('Qualifications must be an array.')
    .custom((value) => value.every((q) => typeof q === 'string'))
    .withMessage('Each qualification must be a string.'),

  // Experience level validation
  body('experienceLevel')
    .optional()
    .isIn(['entry-level', 'mid-level', 'senior-level'])
    .withMessage('Invalid experience level.'),

  // Education validation
  body('education')
    .optional()
    .isArray().withMessage('Education must be an array.')
    .custom((value) => value.every((e) => typeof e === 'string'))
    .withMessage('Each education entry must be a string.'),

  // Company size validation
  body('companySize')
    .optional()
    .isIn(['small', 'medium', 'large'])
    .withMessage('Invalid company size.'),

  // Required skills validation
  body('requiredSkills')
    .optional()
    .isArray().withMessage('Required skills must be an array.')
    .custom((value) => value.every((s) => typeof s === 'string'))
    .withMessage('Each required skill must be a string.'),

  // Application status validation
  body('applicationStatus')
    .optional()
    .isIn(['applied', 'in review', 'interview', 'offered', 'rejected'])
    .withMessage('Invalid application status.'),

  // User ID validation
  body('userId')
    .notEmpty().withMessage('User ID is required.')
    .isMongoId().withMessage('Invalid user ID format.'),
];

module.exports = { jobValidationRules };
