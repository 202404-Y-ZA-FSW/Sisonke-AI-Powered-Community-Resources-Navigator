const express = require('express');
const router = express.Router();
const forumController = require('../../controllers/forum/forum');
const commentController = require('../../controllers/forum/comment');
const likeController = require('../../controllers/forum/like');
const { validateForumPost, validateComment, validateId, handleValidationErrors } = require('../../middleware/validation/forum/forumValidation');

// Forum Post Routes
router.post('/forum', validateForumPost, handleValidationErrors, forumController.createForumPost);
router.get('/forum', forumController.getAllForumPosts);
router.get('/forum/:id', validateId, handleValidationErrors, forumController.getForumPostById);
router.put('/forum/:id', validateId, validateForumPost, handleValidationErrors, forumController.updateForumPost);
router.delete('/forum/:id', validateId, handleValidationErrors, forumController.deleteForumPost);

// Comment Routes
router.post('/forum/:id/comments', validateId, validateComment, handleValidationErrors, commentController.addComment);
router.get('/forum/:id/comments', validateId, handleValidationErrors, commentController.getAllCommentsForPost);

// Like Routes
router.post('/forum/:id/like', validateId, handleValidationErrors, likeController.addLike);
router.delete('/forum/:id/like', validateId, handleValidationErrors, likeController.removeLike);

module.exports = router;
