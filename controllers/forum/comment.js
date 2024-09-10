// Add a comment to a forum post
exports.addComment = async (req, res) => {
    try {
        const { body } = req.body;
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        const newComment = new Comment({
            body,
            author: req.user._id, // Assuming `req.user` contains the logged-in user info
            forumPost: forumPost._id
        });

        const savedComment = await newComment.save();

        // Add the comment to the forum post's comments array
        forumPost.comments.push(savedComment._id);
        await forumPost.save();

        return res.status(201).json({ message: "Comment added successfully", comment: savedComment });
    } catch (err) {
        return res.status(500).json({ error: "Error adding comment", details: err });
    }
};

// Get all comments for a forum post
exports.getCommentsByForumPost = async (req, res) => {
    try {
        const forumPost = await Forum.findById(req.params.postId).populate('comments');

        if (!forumPost) {
            return res.status(404).json({ error: "Forum post not found" });
        }

        return res.status(200).json(forumPost.comments);
    } catch (err) {
        return res.status(500).json({ error: "Error fetching comments", details: err });
    }
};
