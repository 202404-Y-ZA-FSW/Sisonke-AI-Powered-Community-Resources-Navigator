const { check } = require("express-validator");

// UPDATE PASSWORD VALIDATION
const passwordUpdateValidation = [
  check("currentPassword")
    .isLength({ min: 8 })
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .trim()
    .escape()
    .withMessage(
      "Password must be at least 8 characters long and contain a number, an uppercase letter, a lowercase letter and a special character."
    ),
  check("newPassword")
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
    .custom((value, { req }) => value === req.body.newPassword)
    .trim()
    .escape()
    .withMessage(
      "New password and confirmation password do not match please try again"
    ),
];

module.exports = passwordUpdateValidation;