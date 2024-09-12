const { check } = require("express-validator");

// LOGIN VALIDATION
const loginValidation = [
  check("username")
    .isLength({ min: 3 })
    .withMessage(
      "Please enter a valid, it must be at least 3 characters long."
    )
    .isAlphanumeric()
    .trim()
    .escape(),
  check("password")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "Password must be at least 8 characters long and contain a number, an uppercase letter, a lowercase letter and a special character."
    )
    .trim()
    .escape(),
];

// EXPORT VALIDATION
module.exports = loginValidation;