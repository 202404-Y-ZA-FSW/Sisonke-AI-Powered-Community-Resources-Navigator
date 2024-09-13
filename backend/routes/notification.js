const express = require('express');
const router = express.Router();
const notificationController = require('../');
const { validateNotification, handleValidationErrors } = require('../validators/notificationValidator');

// Create a new notification for a user
router.post(
    '/notifications',
    validateNotification,
    handleValidationErrors,
    notificationController.createNotification
);

// Get all notifications for the authenticated user
router.get('/notifications', notificationController.getUserNotifications);

// Mark a notification as read
router.patch('/notifications/:notificationId/read', notificationController.markAsRead);

// Delete a notification by ID
router.delete('/notifications/:notificationId', notificationController.deleteNotification);

module.exports = router;
