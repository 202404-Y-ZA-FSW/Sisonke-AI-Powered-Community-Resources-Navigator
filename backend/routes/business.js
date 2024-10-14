const express = require('express');
const router = express.Router();

// BUSINESS CONTROLLERS
const businessController = require('../controllers/business');

// MIDDILEWARE
const isAuthenticated = require('../middleware/isAuthenticated');

// VALIDATION
const businessValidation = require('../middleware/validation/businessValidation');

// ROUTES
router.post("/new",isAuthenticated, businessValidation, businessController.newBusiness);
router.get("/all", businessValidation,businessController.getAllBusinesses);
router.get("/:id",isAuthenticated, businessController.getBusiness);
router.put("/:id", isAuthenticated,businessValidation, businessController.updateBusiness);
router.delete("/:id",isAuthenticated,businessValidation, businessController.deleteBusiness);

module.exports = router;