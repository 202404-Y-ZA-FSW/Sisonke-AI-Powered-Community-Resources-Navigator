// const commentController = require('../../controllers/blog/comment')
const express = require('express');
const router = express.Router();

const commentController = require('../../controllers/blog/blog-comment-controller');

// router.post('/create', commentController.createComment);
// router.get('/all', commentController.getAllComments);
// router.get('/:id',commentController.getCommentById);
// router.put('/update/:id',commentController.updateComment);
// router.delete('/delete/:id',commentController.deleteComment);

router.post('/new/:blogId', commentController.newComment);
router.get('/:id', commentController.getCommentsByBlogId);
router.delete('/:id', commentController.deleteCommentById);

module.exports = router;
