const { check, validationResult } = require('express-validator');

// Forum post validation rules
exports.validateForumPost = [
    check('title')
        .isString()
        .isLength({ min: 3, max: 100 })
        .withMessage('Title must be between 3 and 100 characters long.'),
    check('body')
        .isString()
        .isLength({ min: 10 })
        .withMessage('Body must be at least 10 characters long.'),
];

// Comment validation rules
exports.validateComment = [
    check('body')
        .isString()
        .isLength({ min: 5 })
        .withMessage('Comment body must be at least 5 characters long.'),
];

// ID validation
exports.validateId = [
    check('id')
        .isMongoId()
        .withMessage('Invalid ID format.')
];

// Validation result handler
exports.handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
