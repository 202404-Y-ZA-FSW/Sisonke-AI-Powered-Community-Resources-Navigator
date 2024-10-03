import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const CreatePostForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, body });
    setTitle("");
    setBody("");
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
      />
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
        >
          Create Post
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
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePostForm;
