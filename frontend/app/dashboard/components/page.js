"use client";
import Head from 'next/head';
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
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { Lock, LockOpen, Delete } from '@mui/icons-material';

// Styled components similar to JobCard
const StyledCard = styled(Card)({
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  borderRadius: 16,
  boxShadow: "none",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const StyledContainer = styled(Container)({
  marginTop: 32,
});

const StyledInput = styled(InputBase)({
  marginBottom: 16,
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: 8,
  width: '100%',
});

const UserTableContainer = styled(TableContainer)({
  marginTop: 16,
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/account/users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        console.error("Failed to fetch users:", response.data);
        alert("Failed to fetch users.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      alert("Error fetching users. Please try again later.");
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove`, { data: { userId: id } });
      if (response.status === 200) {
        alert('User deleted successfully');
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
      } else {
        console.error('Error deleting user:', response.data);
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const toggleUser = async (id, status, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, status, role });

      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, status, role } : user));
        alert("User status updated successfully");
      } else {
        console.error("Failed to update user status");
        alert("Failed to update user status");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const filteredUsers = (users || []).filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeUsers = (users || []).filter((user) => user.status === 'active').length;
  const restrictedUsers = (users || []).filter((user) => user.status === 'restricted').length;
  const totalUsers = (users || []).length;

  return (
    <StyledContainer maxWidth="lg">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Typography variant="h3" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* User Statistics Section */}
      <StyledCard sx={{ mb: 4 }}>
        <CardHeader title="User Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Active Users: {activeUsers}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">Restricted Users: {restrictedUsers}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h6">Total Users: {totalUsers}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      {/* Search Users Section */}
      <StyledCard sx={{ mb: 4 }}>
        <CardHeader title="Search Users" />
        <CardContent>
          <StyledInput
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CardContent>
      </StyledCard>

      {/* User Management Section */}
      <StyledCard>
        <CardHeader title="User Management" />
        <CardContent>
          <UserTableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Username</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Role</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          value={user.role}
                          onChange={(e) => toggleUser(user._id, user.status, e.target.value)}
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="administrator">Admin</MenuItem>
                          <MenuItem value="ngo">NGO</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <IconButton 
                          onClick={() => toggleUser(
                            user._id, 
                            user.status === 'active' ? 'restricted' : 'active', 
                            user.role
                          )}
                          color={user.status === 'active' ? 'success' : 'warning'}
                        >
                          {user.status === 'active' ? <LockOpen /> : <Lock />}
                        </IconButton>
                        <IconButton onClick={() => removeUser(user._id)} color="error">
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </UserTableContainer>
        </CardContent>
      </StyledCard>
    </StyledContainer>
  );
}
