const Blog = require('../../models/blog/blog');

const likeBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const userId = req.user._id; 

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const likeIndex = blog.likes.indexOf(userId);
    if (likeIndex !== -1) {
      blog.likes.splice(likeIndex, 1);
      await blog.save();
      return res.status(200).json({ 
        message: 'Blog unliked', 
        likesCount: blog.likes.length 
      });
    } else {
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({ 
        message: 'Blog liked', 
        likesCount: blog.likes.length 
      });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  likeBlog,
};
