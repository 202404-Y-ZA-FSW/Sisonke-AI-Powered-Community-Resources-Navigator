const Notification = require('../models/notification');

// Create a new notification for a user
exports.createNotification = async (req, res) => {
    try {
        const { user, title, message, type } = req.body;

        const newNotification = new Notification({
            user,
            title,
            message,
            type
        });

        const savedNotification = await newNotification.save();
        return res.status(201).json({ message: "Notification created successfully", notification: savedNotification });
    } catch (err) {
        return res.status(500).json({ error: "Error creating notification", details: err });
    }
};

// Get all notifications for a user
exports.getUserNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user._id });

        return res.status(200).json(notifications);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching notifications", details: err });
    }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.notificationId,
            { isRead: true },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        return res.status(200).json({ message: "Notification marked as read", notification });
    } catch (err) {
        return res.status(500).json({ error: "Error marking notification as read", details: err });
    }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.notificationId);

        if (!notification) {
            return res.status(404).json({ error: "Notification not found" });
        }

        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Error deleting notification", details: err });
    }
};
