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

export default function Forums() {
  const [forums, setForums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchForums();
  }, []);

  const fetchForums = async () => {
    try {
      const response = await axios.get("http://localhost:5000/forums");
      if (response.status === 200) {
        setForums(response.data);
      } else {
        console.error("Failed to fetch forums:", response.data);
        alert("Failed to fetch forums.");
      }
    } catch (err) {
      console.error("Error fetching forums:", err);
      alert("Error fetching forums. Please try again later.");
    }
  };

  const removeForum = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/forums/${id}`);
      if (response.status === 200) {
        alert('Forum deleted successfully');
        setForums(prevForums => prevForums.filter(forum => forum._id !== id));
      } else {
        console.error('Error deleting forum:', response.data);
        alert('Failed to delete forum');
      }
    } catch (error) {
      console.error('Error deleting forum:', error);
      alert('Error deleting forum. Please try again.');
    }
  };

  const filteredForums = (forums || []).filter(
    (forum) =>
      (forum.title && forum.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (forum.creator && forum.creator.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalForums = (forums || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Forums Management
      </Typography>

      {/* Forum Statistics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Forum Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Forums: {totalForums}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Forum Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Search Forums" />
        <CardContent>
          <InputBase
            placeholder="Search by title or creator"
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

      {/* Forum Management Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Forum Management" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Title</strong></TableCell>
                  <TableCell><strong>Creator</strong></TableCell>
                  <TableCell><strong>Date Created</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredForums.length > 0 ? (
                  filteredForums.map((forum) => (
                    <TableRow key={forum._id}>
                      <TableCell>{forum.title}</TableCell>
                      <TableCell>{forum.creator}</TableCell>
                      <TableCell>{new Date(forum.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeForum(forum._id)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No forums found
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
