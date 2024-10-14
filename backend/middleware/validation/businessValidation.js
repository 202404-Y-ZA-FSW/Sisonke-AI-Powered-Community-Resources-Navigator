const { check } = require("express-validator");

const businessValidation = [
  check("name").not().isEmpty().withMessage("Name is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("address").not().isEmpty().withMessage("Address is required"),
  check("city").not().isEmpty().withMessage("City is required"),
  check("phone").isMobilePhone().withMessage("Invalid phone number"),
  check("email").isEmail().withMessage("Invalid email address"),
  check("website").isURL().withMessage("Invalid website URL"),
  check("category").not().isEmpty().withMessage("Category is required"),
  check("image").not().isEmpty().withMessage("Image is required"),
  check("logo").not().isEmpty().withMessage("Logo is required")
];

module.exports = businessValidation;
