const { check, validationResult } = require('express-validator');

// Validation rules for creating or updating an event
exports.validateEvent = [
    check('title')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long.'),

    check('description')
        .isString()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long.'),

    check('date')
        .isISO8601()
        .withMessage('Date must be a valid ISO 8601 date.'),

    check('location')
        .isString()
        .notEmpty()
        .withMessage('Location is required.'),

    check('organizer')
        .isString()
        .notEmpty()
        .withMessage('Organizer is required.'),

    check('category')
        .isString()
        .notEmpty()
        .withMessage('Category is required.')
];

// Middleware to handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};