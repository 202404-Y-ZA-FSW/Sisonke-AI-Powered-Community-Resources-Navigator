'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const BlogForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  const handleBlogSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/blogs/create', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Blog post created successfully!');
        router.push('/blog');
      } else {
        alert('Failed to create the blog post.');
      }
    } catch (error) {
      console.error('Error submitting blog post:', error);
      alert('An error occurred while submitting the blog post.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    handleBlogSubmit(formData);
  };

  // Validate form fields
  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.author) errors.author = 'Author is required';
    if (!formData.content) errors.content = 'Content is required';
    return errors;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, bgcolor: '#f5f5f5', p: 3, borderRadius: 2 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
        Create a New Blog Post
      </Typography>

      <TextField
  name="image"
  placeholder="Image URL"  // Add placeholder instead of label
  variant="outlined"
  fullWidth
  value={formData.image}  // Ensure this is 'image', not 'title'
  onChange={handleChange}
  error={!!errors.image}
  helperText={errors.image}
  sx={{ mb: 2 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <ImageIcon />
      </InputAdornment>
    ),
  }}
/>

      <TextField
        name="title"
        label="Blog Title"
        variant="outlined"
        fullWidth
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        sx={{ mb: 2 }}
      />

      <TextField
        name="author"
        label="Author"
        variant="outlined"
        fullWidth
        value={formData.author}
        onChange={handleChange}
        error={!!errors.author}
        helperText={errors.author}
        sx={{ mb: 2 }}
      />

      <TextField
        name="content"
        label="Blog Content"
        variant="outlined"
        fullWidth
        multiline
        rows={6}
        value={formData.content}
        onChange={handleChange}
        error={!!errors.content}
        helperText={errors.content}
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Blog Post
      </Button>
    </Box>
  );
};

export default BlogForm;
