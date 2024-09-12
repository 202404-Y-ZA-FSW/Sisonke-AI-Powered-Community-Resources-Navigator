const { check } = require("express-validator");

// REGISTER UP VALIDATION
const registerValidation = [
  check("username")
    .isLength({ min: 3 })
    .withMessage(
      "Please enter a valid username, it must be at least 3 characters long."
    )
    .isAlphanumeric()
    .trim()
    .escape(),
  check("email")
    .isEmail()
    .matches(/.+\@.+\..+/)
    .withMessage("Please enter a valid email address to continue.")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .trim()
    .escape()
    .withMessage(
      "Password must be at least 8 characters long and contain a number, an uppercase letter, a lowercase letter and a special character."
    ),
  check("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .trim()
    .escape()
    .withMessage(
      "Password and confirmation password do not match please try again"
    ),
];

module.exports = registerValidation;