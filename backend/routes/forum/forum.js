const express = require('express');
const router = express.Router();
const {
    createForum,
    getAllForums,
    getForumById,
    updateForum,
    deleteForum,
    createComment,
    getCommentsByForumPost,
    updateComment,
    deleteComment,
    likeForumPost,
    unlikeForumPost,
    getLikesByForumPost
} = require('../../controllers/forum/forum');
const {
    validateForumPost,
    validateComment,
    validateLike
} = require('../../middleware/validation/forum/forumValidator');

// Forum routes
router.post('/', validateForumPost, createForum);
router.get('/', getAllForums);
router.get('/:forumId', getForumById);
router.put('/:forumId', validateForumPost, updateForum);
router.delete('/:forumId', deleteForum);

// Comment routes
router.post('/:forumId/comments', validateComment, createComment);
router.get('/:forumId/comments', getCommentsByForumPost);
router.put('/comments/:commentId', validateComment, updateComment);
router.delete('/comments/:commentId', deleteComment);

// Like routes
router.post('/:forumId/like', validateLike, likeForumPost);
router.delete('/:forumId/unlike', validateLike, unlikeForumPost);
router.get('/:forumId/likes', getLikesByForumPost);

module.exports = router;