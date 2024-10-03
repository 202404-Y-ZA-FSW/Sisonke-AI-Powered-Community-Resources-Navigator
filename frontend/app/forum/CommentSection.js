import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { addComment } from "../forum/lib/api";

const CommentSection = ({ comments, postId, onUpdate }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addComment(postId, newComment);
    setNewComment("");
    onUpdate();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <List>
        {comments.map((comment) => (
          <ListItem key={comment._id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar sx={{ backgroundColor: "#6c63ff"}} src={comment.author.avatar} alt={comment.author.username}>
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
        >
          Comment
        </Button>
      </form>
    </Box>
  );
};

export default CommentSection;
