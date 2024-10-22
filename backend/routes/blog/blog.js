const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog/blog-controller');
const textToSpeechController = require('../../controllers/blog/blog-text-to-speech');

// const blogController = require('../../controllers/blog/blog');

// router.get('/all', blogController.getAllBlocks);
// router.get('/:id', blogController.getBlogById);
// router.post('/create', blogController.createBlog);
// router.put('/update/:id', blogController.updateBlog);
// router.delete('/delete/:id', blogController.deleteBlog);

router.get('/all', blogController.getAllBlogs);
router.get('/latest-blogs', blogController.getThreeBlogs);
router.get('/blog/:id', blogController.getBlogById);
router.post('/blog/new', blogController.newBlog);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete', blogController.deleteBlog);

router.post('/blog/convert-to-speech', textToSpeechController.convertToSpeech);

module.exports = router;