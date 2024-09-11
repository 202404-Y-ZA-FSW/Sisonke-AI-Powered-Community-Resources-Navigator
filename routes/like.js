const express = require('express');
const router = express.Router();
const likeController = require('../controllers/blog/like');


router.post('/:blogId/like',  likeController.likeBlog); 

module.exports = router;
