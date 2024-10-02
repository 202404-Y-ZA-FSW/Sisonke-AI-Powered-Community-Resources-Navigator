const express = require('express');
const { sendMessage } = require('../controllers/contact');
const { body } = require('express-validator');

const router = express.Router();

//handle contact message submissions
router.post(
  '/',
  [
    // Validation 
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format').trim(),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  sendMessage 
);

module.exports = router;
