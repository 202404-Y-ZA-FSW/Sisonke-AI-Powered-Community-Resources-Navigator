const express = require('express');
const router = express.Router();

const blogController = require('../../controllers/blog/blog-controller');

// const blogController = require('../../controllers/blog/blog');

// router.get('/all', blogController.getAllBlocks);
// router.get('/:id', blogController.getBlogById);
// router.post('/create', blogController.createBlog);
// router.put('/update/:id', blogController.updateBlog);
// router.delete('/delete/:id', blogController.deleteBlog);

router.get('/all', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/blog/new', blogController.newBlog);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);

module.exports = router;