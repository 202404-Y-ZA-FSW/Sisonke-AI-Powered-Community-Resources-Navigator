import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

import { useAuthentication } from "../hooks/useAuthentication";

const CreatePostForm = ({ onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const newPost = {
        title,
        body,
        author: user.user.id,
      };

      await axios.post("http://localhost:5000/forums/", newPost);
      setTitle("");
      setBody("");
    } catch (err) {
      setError("Failed to create post. Please try again.");
      console.error("Error creating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        InputProps={{
          sx: { borderRadius: "16px" },
        }}
        required
        disabled={isSubmitting}
      />
      <TextField
        fullWidth
        label="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        margin="normal"
        InputProps={{
          sx: { borderRadius: "16px" },
        }}
        required
        multiline
        rows={4}
        disabled={isSubmitting}
      />
      {error && <Box sx={{ color: "error.main", mt: 2 }}>{error}</Box>}
      <Box sx={{ mt: 2 }}>
        <Button
          type="submit"
          sx={{
            backgroundColor: "#6c63ff",
            borderRadius: "16px",
            padding: "8px 16px",
            color: "#ffffff",
            mr: 2,
            textTransform: "none",
            "&:hover": { backgroundColor: "#5A52D5" },
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Post"}
        </Button>
        <Button
          sx={{
            borderRadius: "16px",
            border: "1px solid #6c63ff",
            color: "#6c63ff",
            padding: "8px 16px",
            textTransform: "none",
          }}
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostForm;
