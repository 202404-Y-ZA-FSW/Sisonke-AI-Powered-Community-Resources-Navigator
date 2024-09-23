"use client";

import { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import Link from 'next/link';
import { Box, Typography, Grid, Button } from '@mui/material';

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setIsLoading(true);
      setError(null);
  
      try {
        const response = await fetch('http://localhost:5000/blogs/');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts.');
        }
        const data = await response.json();
        
        // If data is not an array, transform it
        const formattedData = Array.isArray(data) ? data : Object.values(data);
        
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
  

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', textAlign: 'center', mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Blog feed
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Add insight to boost career growth and check out tips on company job vacancies
      </Typography>
      <Grid container spacing={1}>
        {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
          blogPosts.map((post) => (
            <Grid item xs={12} md={4} key={post._id}>
              <Link href={`/blog/${post._id}`} style={{ textDecoration: 'none' }}>
                <BlogCard post={post} />
              </Link>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No blog posts available.</Typography>
        )}
      </Grid>
    </Box>
  );
  
}