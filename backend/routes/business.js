const express = require('express');
const router = express.Router();

// BUSINESS CONTROLLERS
const businessController = require('../controllers/business');

// MIDDILEWARE
const isAuthenticated = require('../middleware/isAuthenticated');

// VALIDATION
const businessValidation = require('../middleware/validation/businessValidation');

// ROUTES
router.post("/new", businessValidation, businessController.newBusiness);
router.get("/all", businessController.getAllBusinesses);
router.get("/:id", businessController.getBusiness);
router.put("/:id", businessValidation, businessController.updateBusiness);
router.delete("/:id", businessController.deleteBusiness);

module.exports = router;