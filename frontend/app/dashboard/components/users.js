
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
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  Avatar,
  Chip,
  Card,
  CardContent,
  Fade,
  Zoom,
  Checkbox,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  FormControl,
  TableSortLabel,
  Pagination,
  Stack
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ExportIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { styled, keyframes } from '@mui/material/styles';

const pulseAnimation = keyframes`
  0% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
  50% { box-shadow: 0 0 25px rgba(99, 102, 241, 0.8); }
  100% { box-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const ColoredPaper = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: '20px',
  '&:hover': {
    transform: 'translateY(-5px) scale(1.01)',
    boxShadow: `0 15px 25px rgba(0, 0, 0, 0.3)`,
    animation: `${pulseAnimation} 3s infinite`,
  },
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
  },
}));

const AnimatedIcon = styled('div')({
  animation: `${floatAnimation} 3s ease-in-out infinite`,
});

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();

  // New Features States
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEditUser, setCurrentEditUser] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });
  const [exporting, setExporting] = useState(false);
  const [filters, setFilters] = useState({ role: 'all', status: 'all' });
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/account/users");
      if (response.status === 200) {
        setUsers(response.data.users);
      } else {
        showSnackbar("Failed to fetch users.");
      }
    } catch (err) {
      showSnackbar("Error fetching users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove`, { data: { userId: id } });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        showSnackbar("User deleted successfully");
      } else {
        showSnackbar('Failed to delete user');
      }
    } catch (error) {
      showSnackbar('Error deleting user. Please try again.');
    }
  };

  const toggleUser = async (id, status, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, status, role });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, status, role } : user));
        showSnackbar("User status updated successfully");
      } else {
        showSnackbar("Failed to update user status");
      }
    } catch (err) {
      showSnackbar("Something went wrong. Please try again.");
    }
  };

  const changeUserRole = async (id, newRole) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, role: newRole });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, role: newRole } : user));
        showSnackbar("User role updated successfully");
      } else {
        showSnackbar("Failed to update user role");
      }
    } catch (err) {
      showSnackbar("Something went wrong. Please try again.");
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredAndSortedUsers.map((user) => user._id);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1),
      );
    }

    setSelectedUsers(newSelected);
  };

  const handleEditClick = (user) => {
    setCurrentEditUser(user);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const { _id, username, email, role, status } = currentEditUser;
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: _id, username, email, role, status });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === _id ? { ...user, username, email, role, status } : user));
        showSnackbar("User updated successfully");
        setEditDialogOpen(false);
        setCurrentEditUser(null);
      } else {
        showSnackbar("Failed to update user");
      }
    } catch (err) {
      showSnackbar("Error updating user. Please try again.");
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredAndSortedUsers = React.useMemo(() => {
    return sortedUsers.filter(user => {
      const matchesSearch = (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
                            (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRole = filters.role === 'all' || user.role === filters.role;
      const matchesStatus = filters.status === 'all' || user.status === filters.status;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [sortedUsers, searchQuery, filters]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const response = await axios.get("http://localhost:5000/account/users", { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      showSnackbar("Users exported successfully");
    } catch (err) {
      showSnackbar("Error exporting users.");
    } finally {
      setExporting(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleViewClick = (user) => {
    setViewUser(user);
    setViewDialogOpen(true);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const paginatedUsers = React.useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredAndSortedUsers.slice(start, start + usersPerPage);
  }, [filteredAndSortedUsers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedUsers.length / usersPerPage);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'administrator':
        return <AdminPanelSettingsIcon />;
      case 'ngo':
        return <VolunteerActivismIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex', 
      flexDirection: 'column', 
      gap: 4,
      background: `linear-gradient(135deg, #f6f7ff 0%, #e9eeff 100%)`,
      p: 4
    }}>
      <Fade in={true} timeout={800}>
        <ColoredPaper elevation={6} sx={{ p: 4, borderRadius: '30px', background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' }}>
          <Typography variant="h3" gutterBottom sx={{ 
            textAlign: 'center', 
            color: 'white',
            textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
            fontWeight: 800,
            fontSize: { xs: '2rem', md: '3rem' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AnimatedIcon>
              <PersonIcon sx={{ mr: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }} />
            </AnimatedIcon>
            User Dashboard
          </Typography>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <GlassCard elevation={5}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 700, fontSize: '1.25rem' }}>
                      Active Users
                    </Typography>
                    <Typography variant="h1" color="secondary" sx={{ fontWeight: 800, fontSize: '2.5rem' }}>
                      {users.filter(user => user.status === 'active').length}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={4}>
              <Zoom in={true} style={{ transitionDelay: '400ms' }}>
                <GlassCard elevation={5}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 700, fontSize: '1.25rem' }}>
                      Restricted Users
                    </Typography>
                    <Typography variant="h1" color="secondary" sx={{ fontWeight: 800, fontSize: '2.5rem' }}>
                      {users.filter(user => user.status === 'restricted').length}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Zoom>
            </Grid>
            <Grid item xs={12} md={4}>
              <Zoom in={true} style={{ transitionDelay: '600ms' }}>
                <GlassCard elevation={5}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 700, fontSize: '1.25rem' }}>
                      Total Users
                    </Typography>
                    <Typography variant="h1" color="secondary" sx={{ fontWeight: 800, fontSize: '2.5rem' }}>
                      {users.length}
                    </Typography>
                  </CardContent>
                </GlassCard>
              </Zoom>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Paper elevation={3} sx={{ p: 4, borderRadius: '20px', background: '#ffffff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>Search Users</Typography>
          <Tooltip title="Refresh Users">
            <IconButton onClick={fetchUsers} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-role-label">Role</InputLabel>
            <Select
              labelId="filter-role-label"
              name="role"
              value={filters.role}
              label="Role"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="administrator">Admin</MenuItem>
              <MenuItem value="ngo">NGO</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-status-label">Status</InputLabel>
            <Select
              labelId="filter-status-label"
              name="status"
              value={filters.status}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="restricted">Restricted</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<ExportIcon />}
            onClick={handleExport}
            disabled={exporting}
          >
            {exporting ? 'Exporting...' : 'Export CSV'}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', borderRadius: '20px', background: '#ffffff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" gutterBottom>User Management</Typography>
          {selectedUsers.length > 0 && (
            <Box>
              <Tooltip title="Delete Selected">
                <IconButton onClick={() => {
                  selectedUsers.forEach(id => removeUser(id));
                  setSelectedUsers([]);
                }} color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Lock Selected">
                <IconButton onClick={() => {
                  selectedUsers.forEach(id => toggleUser(id, 'restricted', null));
                  setSelectedUsers([]);
                }} color="primary">
                  <LockIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Unlock Selected">
                <IconButton onClick={() => {
                  selectedUsers.forEach(id => toggleUser(id, 'active', null));
                  setSelectedUsers([]);
                }} color="secondary">
                  <LockOpenIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Box} sx={{ flexGrow: 1, overflow: 'auto' }}>
              <Table stickyHeader aria-label="user management table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={selectedUsers.length > 0 && selectedUsers.length < filteredAndSortedUsers.length}
                        checked={filteredAndSortedUsers.length > 0 && selectedUsers.length === filteredAndSortedUsers.length}
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'username'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('username')}
                      >
                        User
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'email'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('email')}
                      >
                        Email
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'role'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('role')}
                      >
                        Role
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortConfig.key === 'status'}
                        direction={sortConfig.direction}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => {
                      const isItemSelected = isSelected(user._id);
                      return (
                        <TableRow key={user._id} hover role="checkbox" aria-checked={isItemSelected} selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleSelectOne(event, user._id)}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Avatar sx={{ mr: 2, bgcolor: '#6366f1' }}>{user.username[0].toUpperCase()}</Avatar>
                              {user.username}
                            </Box>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {getRoleIcon(user.role)}
                              <Select
                                value={user.role}
                                onChange={(e) => changeUserRole(user._id, e.target.value)}
                                sx={{ ml: 1 }}
                              >
                                <MenuItem value="user">User</MenuItem>
                                <MenuItem value="administrator">Admin</MenuItem>
                                <MenuItem value="ngo">NGO</MenuItem>
                              </Select>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={user.status} 
                              color={user.status === 'active' ? 'success' : 'error'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip title="View User Details">
                              <IconButton onClick={() => handleViewClick(user)} color="info">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit User">
                              <IconButton onClick={() => handleEditClick(user)} color="primary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Button
                              startIcon={user.status === 'active' ? <LockIcon /> : <LockOpenIcon />}
                              onClick={() => toggleUser(user._id, user.status === 'active' ? 'restricted' : 'active', user.role)}
                              color={user.status === 'active' ? 'primary' : 'secondary'}
                              variant="contained"
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              {user.status === 'active' ? 'Lock' : 'Unlock'}
                            </Button>
                            <Button
                              startIcon={<DeleteIcon />}
                              onClick={() => removeUser(user._id)}
                              color="error"
                              variant="contained"
                              size="small"
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} align="center">No users found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Stack spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
            </Stack>
          </>
        )}
      </Paper>

      {/* Edit User Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {currentEditUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
              <TextField
                label="Username"
                value={currentEditUser.username}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser, username: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={currentEditUser.email}
                onChange={(e) => setCurrentEditUser({ ...currentEditUser, email: e.target.value })}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel id="edit-role-label">Role</InputLabel>
                <Select
                  labelId="edit-role-label"
                  value={currentEditUser.role}
                  label="Role"
                  onChange={(e) => setCurrentEditUser({ ...currentEditUser, role: e.target.value })}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="administrator">Admin</MenuItem>
                  <MenuItem value="ngo">NGO</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="edit-status-label">Status</InputLabel>
                <Select
                  labelId="edit-status-label"
                  value={currentEditUser.status}
                  label="Status"
                  onChange={(e) => setCurrentEditUser({ ...currentEditUser, status: e.target.value })}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="restricted">Restricted</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* View User Details Dialog */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {viewUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6">Username: {viewUser.username}</Typography>
              <Typography variant="body1">Email: {viewUser.email}</Typography>
              <Typography variant="body1">Role: {viewUser.role}</Typography>
              <Typography variant="body1">Status: {viewUser.status}</Typography>
              <Typography variant="body1">Created At: {new Date(viewUser.createdAt).toLocaleString()}</Typography>
              <Typography variant="body1">Last Updated: {new Date(viewUser.updatedAt).toLocaleString()}</Typography>
              {/* Add more user details as needed */}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
}