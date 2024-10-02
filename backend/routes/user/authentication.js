// REQUIRED PACKAGES
const express = require('express');
const router = express.Router();

// CONTROLLER
const authenticationController = require('../../controllers/user/authentication');

// MIDDLEWARE
const isAuthenticated = require('../../middleware/isAuthenticated');

// VALIDATION
const registerValidation = require('../../middleware/validation/user/registerValidation');
const loginValidation = require('../../middleware/validation/user/loginValidation');
const passwordUpdateValidation = require('../../middleware/validation/user/updatePasswordValidation');

// ROUTES
router.post("/register", registerValidation, authenticationController.register);
router.post("/login", loginValidation, authenticationController.login);
router.get("/user", isAuthenticated, authenticationController.currentUser);
router.post("/update/password", isAuthenticated, passwordUpdateValidation, authenticationController.updatePassword);
router.get("/logout", isAuthenticated, authenticationController.logout);

module.exports = router;