const commentModel = require('../models/blog/comment'); 
const commentController = require('../controllers/blog/comment')
const express = require('express');
const router = express.Router();
const comment = require('../models/blog/comment');

router.post('/create', commentController.createComment);
router.get('/all', commentController.getAllComments);
router.get('/:id',commentController.getCommentById);
router.put('/update/:id',commentController.updateComment);
router.delete('/delete/:id',commentController.deleteComment);

module.exports = router;
