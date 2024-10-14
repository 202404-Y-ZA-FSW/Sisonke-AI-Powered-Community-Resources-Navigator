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

export default function Businesses() {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/business/all");
      console.log(response);
      if (response.status === 200) {
        setBusinesses(response.data.businesses ||response.data || []);
      } else {
        console.error("Failed to fetch businesses:", response.data);
        alert("Failed to fetch businesses.");
      }
    } catch (err) {
      console.error("Error fetching businesses:", err);
      alert("Error fetching businesses. Please try again later.");
    }
  };

  const removeBusiness = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/business/${id}`);

      if (response.status === 200) {
        alert('Business deleted successfully');
        setBusinesses(prevBusinesses => prevBusinesses.filter(business => business._id !== id));
      } else {
        console.error('Error deleting business:', response.data);
        alert('Failed to delete business');
      }
    } catch (error) {
      console.error('Error deleting business:', error);
      alert('Error deleting business. Please try again.');
    }
  };

  const filteredBusinesses = Array.isArray(businesses) ? businesses.filter(
    (business) =>
      (business.name && business.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (business.owner && business.owner.toLowerCase().includes(searchQuery.toLowerCase()))
  ) : [];
  

  const totalBusinesses = (businesses || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Businesses Management
      </Typography>

      {/* Business Statistics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Business Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Businesses: {totalBusinesses}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Business Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Search Businesses" />
        <CardContent>
          <InputBase
            placeholder="Search by name or owner"
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

      {/* Business Management Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Business Management" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Owner</strong></TableCell>
                  <TableCell><strong>Date Created</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBusinesses.length > 0 ? (
                  filteredBusinesses.map((business,user) => (
                    <TableRow key={business._id}>
                      <TableCell>{business.name}</TableCell>
                      <TableCell>{business.owner?business.owner.username: null}</TableCell>
                      <TableCell>{new Date(business.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeBusiness(business._id)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      No businesses found
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
