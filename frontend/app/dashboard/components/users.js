'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Paper, 
  Typography, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Select,
  MenuItem,
  Button,
  Grid,
  Box,
  CircularProgress,
  Snackbar
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/account/users");
      if (response.status === 200) {
        setUsers(response.data);
      } else {
        setError("Failed to fetch users.");
      }
    } catch (err) {
      setError("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove`, { data: { userId: id } });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        setError("User deleted successfully");
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      setError('Error deleting user. Please try again.');
    }
  };

  const toggleUser = async (id, status, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, status, role });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, status, role } : user));
        setError("User status updated successfully");
      } else {
        setError("Failed to update user status");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const filteredUsers = (users || []).filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx = {{textAlign : 'center'}}>User Statistics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Active Users: {users.filter(user => user.status === 'active').length}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Restricted Users: {users.filter(user => user.status === 'restricted').length}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1">Total Users: {users.length}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx = {{ textAlign : 'center' }}>Search Users</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Paper>

      <Paper elevation={3} sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom sx = {{textAlign : 'center'}}>User Management</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Box} sx={{ flexGrow: 1, overflow: 'auto' }}>
            <Table stickyHeader aria-label="user management table">
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
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
                          fullWidth
                        >
                          <MenuItem value="user">User</MenuItem>
                          <MenuItem value="administrator">Admin</MenuItem>
                          <MenuItem value="ngo">NGO</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>{user.status}</TableCell>
                      <TableCell>
                        <Button
                          startIcon={user.status === 'active' ? <LockIcon /> : <LockOpenIcon />}
                          onClick={() => toggleUser(user._id, user.status === 'active' ? 'restricted' : 'active', user.role)}
                          color={user.status === 'active' ? 'primary' : 'secondary'}
                          variant="contained"
                          sx={{ mr: 1 }}
                        >
                          {user.status === 'active' ? 'Lock' : 'Unlock'}
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          onClick={() => removeUser(user._id)}
                          color="error"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No users found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
}