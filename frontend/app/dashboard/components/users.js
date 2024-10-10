import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Card, CardContent, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, InputBase, 
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import axios from 'axios';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', email: '', status: 'Active', role: 'User' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/account/users');
      if (response.status !== 200) {
        alert('Failed to fetch users.');
      } else {
        setUsers(response.data.users);
        alert('Users fetched successfully');
      }
    } catch (err) {
      alert('Error fetching users. Please try again later.');
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove/${id}`);
      if (response.status === 200) {
        alert('User deleted successfully');
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } else {
        console.error('Error deleting user:', response.data);
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const toggleUser = async (id, status, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update/${id}`, { status, role });
      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === id ? { ...user, status: status === 'Active' ? 'Inactive' : 'Active', role } : user))
        );
        alert('User status updated successfully');
      } else {
        console.error('Failed to update user status');
        alert('Failed to update user status');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update user status');
    }
  };

  const handleOpenDialog = (user = null) => {
    setEditingUser(user);
    setNewUser(user || { username: '', email: '', status: 'Active', role: 'User' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setNewUser({ username: '', email: '', status: 'Active', role: 'User' });
  };

  const handleSaveUser = async () => {
    if (editingUser) {
      try {
        const response = await axios.put(`http://localhost:5000/account/update/${editingUser._id}`, newUser);
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.map((user) => (user._id === editingUser._id ? { ...user, ...newUser } : user)));
          alert('User updated successfully');
        } else {
          alert('Failed to update user');
        }
      } catch (err) {
        alert('Error updating user. Please try again later.');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/account/create', newUser);
        if (response.status === 200) {
          setUsers([...users, { ...newUser, _id: response.data._id }]);
          alert('User added successfully');
        } else {
          alert('Failed to add user');
        }
      } catch (err) {
        alert('Error adding user. Please try again later.');
      }
    }
    handleCloseDialog();
  };

  const filteredUsers = users.filter(
    (user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <InputBase
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: '70%', p: 1, border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <Button variant="contained" startIcon={<Add />} onClick={() => handleOpenDialog()}>
              Add User
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(user)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => removeUser(user._id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            fullWidth
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Status</InputLabel>
            <Select value={newUser.status} onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Role</InputLabel>
            <Select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              <MenuItem value="User">User</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
