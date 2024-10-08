const { GoogleGenerativeAI } = require("@google/generative-ai");
const BlogComment = require("../../models/blog/blog-comment");
const BlogModel = require("../../models/blog/blog-model");
const { validationResult } = require("express-validator");

// INITIALIZE GEMINI
const genAI = new GoogleGenerativeAI("AIzaSyC9v1_1GY_ldbxS_ic1Ymnp5FHSFPJ8VnA");

// FUNCTION TO FILTER COMMENTS
async function filterComment(comment) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
        Analyze the following comment for inappropriate content such as hate speech, harassment, or any other form of inappropriate language:
        "${comment}"
      
        Respond with a JSON object containing two fields:
        1. "isAppropriate": a boolean indicating whether the comment is appropriate (true) or inappropriate (false)
        2. "reason": a brief explanation of why the comment is flagged as inappropriate, or "None" if it's appropriate
      `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    return JSON.parse(response.text());
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    if (error.message.includes("Candidate was blocked due to SAFETY")) {
      return {
        isAppropriate: false,
        reason:
          "Your comment contains inappropriate words and due to the Sisonke communication guidelines it has been rejected and will be filtered out.",
      };
    }
    // Fallback to simple profanity filter if AI model fails
    return simpleProfanityFilter(comment);
  }
}

// Simple fallback filter function
function simpleProfanityFilter(text) {
  const profanityList = [
    "butt",
    "bitch",
    "bitches",
    "dickhead",
    "dickheads",
    "faggot",
    "explicit",
    "fucked",
    "fucking",
    "fuck",
    "fucker",
    "fuckers",
    "fuckin",
    "fucking shit",
    "shit",
    "fucks",
    "gay",
    "gays",
    "hell",
    "homo",
    "cunt",
    "cunts",
    "asshole",
    "assholes",
    "dick",
    "dicks",
    "nigga",
    "niggas",
    "nigger",
    "niggers",
  ];
  const lowercaseText = text.toLowerCase();
  for (const word of profanityList) {
    if (lowercaseText.includes(word)) {
      return {
        isAppropriate: false,
        reason: "Comment contains prohibited words.",
      };
    }
  }
  return {
    isAppropriate: true,
    reason: "None",
  };
}

// Create a comment on a blog post
exports.newComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { blogId } = req.params;
    const { content, author } = req.body;

    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    let filterResult;
    try {
      // TRYING TO FILTER COMMENT USING GEMINI
      filterResult = await filterComment(content);
    } catch (aiError) {
      console.error(
        "AI filtering failed, falling back to simple filter:",
        aiError
      );
      // FALLBACK TO SIMPLE PROFANITY FILTER
      filterResult = simpleProfanityFilter(content);
    }

    if (!filterResult.isAppropriate) {
      return res.status(400).json({
        message: "Comment flagged as inappropriate",
        reason: filterResult.reason,
      });
    }

    const newComment = new BlogComment({
      blog: blogId,
      content,
      author,
    });

    await newComment.save();

    // ADDING COMMENT TO BLOG POST COMMENTS ARRAY
    await BlogModel.findByIdAndUpdate(blogId, {
      $push: { comments: newComment._id },
    });

    res
      .status(201)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (error) {
    console.error("Error in Forum Comment", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL COMMENTS BY BLOG ID
exports.getCommentsByBlogId = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await BlogModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    const comments = await BlogComment.find({ blog: blogId }).populate("author");

    res.json(comments);
  } catch (error) {
    console.error("Error in retrieving comments by blog ID", error);
    res.status(500).json({ error: error.message });
  }
};

// GET A SINGLE COMMENT BY ID
exports.getCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await BlogComment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(comment);
  } catch (error) {
    console.error("Error in retrieving comment by ID", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE A COMMENT BY ID
exports.deleteCommentById = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await BlogComment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await comment.remove();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error in deleting comment by ID", error);
    res.status(500).json({ error: error.message });
  }
};
