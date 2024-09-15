const { check } = require('express-validator');

// SUBSCRIBER VALIDATION
const subscriberValidation = [
    check('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Please enter a valid email address')
];

module.exports = subscriberValidation;