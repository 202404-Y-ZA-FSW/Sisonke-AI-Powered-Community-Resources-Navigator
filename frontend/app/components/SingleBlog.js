'use client'

import React from 'react';
import Image from 'next/image';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';

// Simulate fetching the blog post from an API
async function getBlogPost(id) {
  const res = await fetch(`http://localhost:5000/blogs/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blog post');
  }

  return res.json();
}

export default async function BlogPostPage({ params }) {
  const { id } = params || {}; // Safely extract id

  const router = useRouter(); // Use router to handle navigation

  // If no id is present, redirect to a custom 404 or error page
  if (!id) {
    return (
      <Box
        component="main"
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          mt: 5,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" component="h2">
          Blog post not found.
        </Typography>
        <Typography variant="body1">
          The blog post you are looking for does not exist.
        </Typography>
      </Box>
    );
  }

  try {
    const blogPost = await getBlogPost(id);

    return (
      <Box
        component="main"
        sx={{
          maxWidth: '800px',
          mx: 'auto',
          mt: 5,
          px: 2,
        }}
      >
        <Card elevation={3}>
          <Box sx={{ position: 'relative', width: '100%', height: 300 }}>
            <Image
              src={blogPost.image || '/placeholder.svg?height=300&width=600'}
              alt={blogPost.title}
              layout="fill"
              objectFit="cover"
            />
          </Box>
          <CardContent>
            <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
              {blogPost.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              {blogPost.readTime || 'No read time available'}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {blogPost.description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  } catch (error) {
    // Redirect to a custom 404 page or show an error message
    router.push('/404'); // Ensure you have a /404 page
    return null;
  }
}
