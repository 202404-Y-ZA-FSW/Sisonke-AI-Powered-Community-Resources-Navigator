const express = require('express');
const router = express.Router();
const forumController = require('../../controllers/forum/forum');
const commentController = require('../../controllers/forum/comment');
const likeController = require('../../controllers/forum/like');
const { 
    validateForumPost, 
    validateComment, 
    validateId, 
    handleValidationErrors 
} = require('../../middleware/validation/forum/forumValidation');

// Forum Post Routes
router.post('/', validateForumPost, handleValidationErrors, forumController.createForumPost);
router.get('/', forumController.getAllForumPosts);
router.get('/:id', validateId, handleValidationErrors, forumController.getForumPostById);
router.put('/:id', validateId, validateForumPost, handleValidationErrors, forumController.updateForumPost);
router.delete('/:id', validateId, handleValidationErrors, forumController.deleteForumPost);

// Comment Routes
router.post('/:postId/comments', validateId, validateComment, handleValidationErrors, commentController.addComment);
router.get('/:postId/comments', validateId, handleValidationErrors, commentController.getCommentsByForumPost);

// Like Routes
router.post('/:postId/like', validateId, handleValidationErrors, likeController.addLike);
router.delete('/:postId/like', validateId, handleValidationErrors, likeController.removeLike);

module.exports = router;