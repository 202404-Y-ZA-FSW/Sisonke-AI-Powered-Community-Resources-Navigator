const express = require('express');
const router = express.Router();

// LIKE CONTROLLER
const likeController = require('../../controllers/blog/like');

// MIDDLIEWARE
const authenticationMiddleware = require('../../middleware/isAuthenticated');

router.post('/like',  likeController.newLike); 
router.get('/likes/:blogID', likeController.getAllLikedBlogs);
router.delete('/unlike/:blogID', likeController.unlike);
router.get('/like/count/:blogID', likeController.getLikeCount);

module.exports = router;
