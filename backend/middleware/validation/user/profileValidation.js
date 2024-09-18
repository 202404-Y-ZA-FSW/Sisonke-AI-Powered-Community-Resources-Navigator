const { check } = require("express-validator");

// PROFILE VALIDATION
const profileValidator = [
  check("firstName")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .trim()
    .escape(),
  check("lastName")
    .not()
    .isEmpty()
    .withMessage("Surname is required")
    .trim()
    .escape(),
  check("dateOfBirth")
    .not()
    .isDate()
    .withMessage("Date of birth is required")
    .trim()
    .escape(),
  check("phoneNumber")
    .not()
    .isEmpty()
    .withMessage("Phone number is required")
    .trim()
    .escape(),
  check("gender")
    .not()
    .isEmpty()
    .withMessage("Gender is required")
    .trim()
    .escape(),
  check("address")
    .not()
    .isEmpty()
    .withMessage("Address is required")
    .trim()
    .escape(),
  check("location")
    .not()
    .isEmpty()
    .withMessage("City/Township is required")
    .trim()
    .escape(),
  check("bio").not().isEmpty().withMessage("Bio is required").trim().escape(),
];

// EXPORT VALIDATION
module.exports = profileValidator;
