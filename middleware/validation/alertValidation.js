const { check, validationResult } = require('express-validator');

// Validation rules
exports.validateAlert = [
    check('title')
        .isString()
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long.'),

    check('message')
        .isString()
        .isLength({ min: 10 })
        .withMessage('Message must be at least 10 characters long.'),

    check('Type')
        .isIn(['info', 'warning', 'critical'])
        .withMessage('Type must be one of: info, warning, critical.'),

    check('audience')
        .optional()
        .isIn(['global', 'users', 'admins'])
        .withMessage('Audience must be one of: global, users, admins.'),

    check('expiresAt')
        .optional()
        .isISO8601()
        .withMessage('ExpiresAt must be a valid date.')
];

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
