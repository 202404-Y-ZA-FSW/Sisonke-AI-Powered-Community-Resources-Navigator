const express = require('express');
const router = express.Router();

// SUBSCRIBER CONTROLLERS
const subscriberController = require('../controllers/subscriber');

// VALIDATION
const subscriberValidation = require('../middleware/validation/subscriberValidation');

// ROUTES
router.post('/subscribe', subscriberValidation, subscriberController.newSubscriber);
router.get('/subscribers', subscriberController.getAllSubscribers);
router.post('/unsubscribe', subscriberValidation, subscriberController.unsubscribe);

module.exports = router;