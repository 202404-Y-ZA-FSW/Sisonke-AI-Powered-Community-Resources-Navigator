"use client";

import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button, Box } from '@mui/material';
import axios from 'axios';
import Link from 'next/link';

// Component to display individual blog details
const BlogCardDetails = ({ blog }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        mb: 4,
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ddd',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="text.secondary">
            By {blog.author || 'Unknown Author'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(blog.createdAt).toLocaleDateString() || 'Invalid Date'}
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.content ? blog.content.substring(0, 100) : 'No content available'}...
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`http://localhost:5000/blogs/${blog._id}`} passHref>
          <Button variant="contained" color="primary" sx={{ width: '100%' }}>
            Read More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

// Main component to display blog cards and dynamic fetching
const BlogCard = () => {
  const [blogs, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/blogs/all');
        console.log(response);

        if (!response.ok) {
          throw new Error('Failed to fetch blog posts.');
        }
        const data = await response.json();
        const formattedData = data.blogs;
        setBlogPosts(formattedData);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      
      <Grid container spacing={3} justifyContent="center">
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <BlogCardDetails blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BlogCard;
