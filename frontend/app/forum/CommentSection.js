import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useAuthentication } from "../hooks/useAuthentication";

const CommentSection = ({ forumId, onUpdate }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuthentication();

  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/forums/${forumId}/comments`);
      setComments(response.data);
    } catch (err) {
      setError("Failed to fetch comments. Please try again.");
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [forumId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {

      await axios.post(`http://localhost:5000/forums/${forumId}/comments`, {
        forumId,
        body: newComment,
        author: user.user.id,
      });

      setNewComment("");
      fetchComments();
      onUpdate();
    } catch (err) {
      setError("Failed to post comment. Please try again.");
      console.error("Error posting comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                sx={{ backgroundColor: "#6c63ff" }}
                alt={comment.author.username}
              >
                {comment.author.username[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={comment.author.username}
              secondary={comment.body}
            />
          </ListItem>
        ))}
      </List>
      {user ? (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Add a new comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            sx={{ marginBottom: 1 }}
            InputProps={{
              sx: { borderRadius: "16px" },
            }}
            disabled={isSubmitting}
          />
          <Button
            sx={{
              backgroundColor: "#6c63ff",
              borderRadius: "16px",
              padding: "8px 16px",
              color: "#ffffff",
              textTransform: "none",
              "&:hover": { backgroundColor: "#5A52D5" },
            }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Comment"
            )}
          </Button>
          {error && (
            <Typography variant="body2" sx={{ marginTop: 1, color: "error.main" }}>
              {error}
            </Typography>
          )}
        </form>
      ) : (
        <Typography variant="body2" sx={{ marginBottom: 2, color: "#6c63ff" }}>
          You need to login to post a new comment.
        </Typography>
      )}
    </Box>
  );
};

export default CommentSection;
