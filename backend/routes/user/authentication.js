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
router.get("/users", authenticationController.getUsers);
router.get("/logout", isAuthenticated, authenticationController.logout);
router.get("/user", isAuthenticated, authenticationController.currentUser);

router.post("/register", registerValidation, authenticationController.register);
router.post("/login", loginValidation, authenticationController.login);
router.post("/update/password", isAuthenticated, passwordUpdateValidation, authenticationController.updatePassword);

router.get("/logout", isAuthenticated, authenticationController.logout);
router.get( "/users", authenticationController.fetchUsers)
router.delete("/remove", authenticationController.remove);
router.put("/update", authenticationController.updateUser);


module.exports = router;