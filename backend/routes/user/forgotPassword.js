const express = require('express');
const router = express.Router();
const forgotPasswordController = require('../../controllers/user/forgotPassword');

router.post('/forgot-password', forgotPasswordController.forgotPassword);
router.put('/reset-password/:resetToken', forgotPasswordController.resetPassword);

module.exports = router;