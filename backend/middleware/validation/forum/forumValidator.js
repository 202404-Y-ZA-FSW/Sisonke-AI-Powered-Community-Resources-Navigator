const { check } = require('express-validator');

// Validation for creating or updating a forum post
const validateForumPost = [
    check('title').not().isEmpty().withMessage('Title is required'),
    check('body').not().isEmpty().withMessage('Body is required'),
    check('author').not().isEmpty().withMessage('Author is required')
];

// Validation for creating or updating a comment
const validateComment = [
    check('body').not().isEmpty().withMessage('Comment body is required'),
    check('author').not().isEmpty().withMessage('Author is required')
];

// Validation for liking a forum post
const validateLike = [
    check('userId').not().isEmpty().withMessage('User ID is required')
];

module.exports = {
    validateForumPost,
    validateComment,
    validateLike
};