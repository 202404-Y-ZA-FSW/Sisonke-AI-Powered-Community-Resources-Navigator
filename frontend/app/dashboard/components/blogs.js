"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
        const response = await axios.get("http://localhost:5000/blogs/all"); 
        console.log("Response Data:", response.data); // Log the response for debugging

        if (response.status === 200) {
            // Ensure response.data is an array
            setBlogs(Array.isArray(response.data) ? response.data : []);
        } else {
            console.error("Failed to fetch blogs:", response.data);
            alert("Failed to fetch blogs.");
        }
    } catch (err) {
        console.error("Error fetching blogs:", err);
        alert("Error fetching blogs. Please try again later.");
    }
};


  const removeBlog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      if (response.status === 200) {
        alert('Blog deleted successfully');
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id));
      } else {
        console.error('Error deleting blog:', response.data);
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Error deleting blog. Please try again.');
    }
  };

  const filteredBlogs = (blogs || []).filter(
    (blog) =>
      (blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (blog.author && blog.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalBlogs = (blogs || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Blogs Management
      </Typography>

      {/* Blog Statistics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Blog Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Blogs: {totalBlogs}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Blog Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Search Blogs" />
        <CardContent>
          <InputBase
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          />
        </CardContent>
      </Card>

      {/* Blog Management Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Blog Management" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Author</strong></TableCell>
                  <TableCell><strong>Date Published</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((blog) => (
                    <TableRow key={blog._id}>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>{blog.author}</TableCell>
                      <TableCell>{new Date(blog.publishedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeBlog(blog._id)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No blogs found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
}
