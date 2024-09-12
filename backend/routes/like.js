const express = require('express');
const router = express.Router({ mergeParams: true });
const likeController = require('../controllers/blog/like');


router.post('/like',  likeController.likeBlog); 

module.exports = router;
