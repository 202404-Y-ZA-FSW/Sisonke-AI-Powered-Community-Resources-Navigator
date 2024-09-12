const { check, validationResult } = require('express-validator');

// Notification validation rules
exports.validateNotification = [
    check('user').isMongoId().withMessage('User ID must be a valid MongoDB ID.'),
    check('title').isString().isLength({ min: 3 }).withMessage('Title must be at least 3 characters long.'),
    check('message').isString().isLength({ min: 5 }).withMessage('Message must be at least 5 characters long.'),
    check('type').isString().withMessage('Type must be a string.')
];

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
