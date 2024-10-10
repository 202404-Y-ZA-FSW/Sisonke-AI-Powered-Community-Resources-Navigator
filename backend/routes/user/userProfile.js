// REQUIRED PACKAGES
const express = require('express');
const router = express.Router();

// USER PROFILE CONTROLLER
const userProfileController = require('../../controllers/user/userProfile');

// MIDDLEWARE
const isAuthenticated = require('../../middleware/isAuthenticated');

// VALIDATION
const profileValidation = require('../../middleware/validation/user/profileValidation');

// ROUTES
router.post("/profile", profileValidation, userProfileController.addUserProfile);
router.get("/profile", userProfileController.getUserProfile);
router.put("/profile", profileValidation, userProfileController.updateUserProfile);
module.exports = router;
