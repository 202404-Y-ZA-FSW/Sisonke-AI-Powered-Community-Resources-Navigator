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
router.post("/create", profileValidation, userProfileController.addUserProfile);
router.get("/profile", userProfileController.getUserProfile);
router.get("/all", userProfileController.getAllUserProfiles);
router.put("/profile", profileValidation, userProfileController.updateUserProfile);

module.exports = router;
