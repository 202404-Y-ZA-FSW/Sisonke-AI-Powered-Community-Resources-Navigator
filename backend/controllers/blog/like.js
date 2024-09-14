const Blog = require("../../models/blog/blog");
const User = require("../../models/user/user");
const Like = require("../../models/blog/like");

// New like
exports.newLike = async (req, res) => {
  try {
    const { blogID } = req.params;
    const userID = req.userID;

    // Check if both the blog and user exist
    const [blog, user] = await Promise.all([
      Blog.findById(blogID),
      User.findById(userID)
    ]);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has already liked this blog
    const existingLike = await Like.findOne({ user: userID, blog: blogID });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this blog" });
    }

    // Create a new like entry
    const like = new Like({ user: userID, blog: blogID });
    await like.save();

    // Increment the blog's like count or update the blog's likes array if needed
    blog.likes.push(userID);
    await blog.save();

    return res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    console.error("Error in newLike controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// UNLIKE BLOG
exports.unlike = async (req, res) => {
  try {
    const { blogID } = req.params;
    const userID = req.userID;

    const blog = await Blog.findById(blogID);
    const user = await User.findById(userID);

    if (!blog || !user) {
      return res.status(404).json({ message: "Blog or user not found" });
    }

    if (!blog.likes.includes(userID)) {
      return res.status(400).json({ message: "You have not liked this blog" });
    }

    blog.likes = blog.likes.filter((id) => id.toString() !== userID.toString());
    await blog.save();

    return res.status(200).json({ message: "Blog unliked successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// BLOG LIKE COUNT
exports.getLikeCount = async (req, res) => {
  try {
    const { blogID } = req.params;
    const blog = await Blog.findById(blogID);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const likeCount = blog.likes.length;

    return res.status(200).json({ likeCount });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL LIKED BLOGS
exports.getAllLikedBlogs = async (req, res) => {
  try {
    const userID = req.userID;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const likedBlogs = await Blog.find({ likes: userID });

    return res.status(200).json({ likedBlogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
