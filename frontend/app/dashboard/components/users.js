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
  Fade,
  Modal,
  Switch,
  Skeleton,
  Pagination
} from '@mui/material';
import { Lock, LockOpen, Delete, Info } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/account/users", {
        params: { page, limit: 10 }
      });
      console.log(response.data); 
      setUsers(response.data.users || response.data || []); 
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };
  

  const handleModalOpen = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const filteredUsers = (users || []).filter(
    (user) =>
      (user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Head>
          <title>Admin Dashboard</title>
        </Head>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
            Admin Dashboard
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" sx={{ mr: 2 }}>
              Dark Mode
            </Typography>
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </Box>
        </Box>

        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={400} />
        ) : (
          <Fade in timeout={1000}>
            <Box>
              <UserStatistics users={users} />
              <UserSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <UserManagement
                users={filteredUsers}
                handleModalOpen={handleModalOpen}
              />
            </Box>
          </Fade>
        )}

        {/* Pagination */}
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={10} // Assuming 10 pages, can dynamically calculate based on data
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>

        {/* User Details Modal */}
        {selectedUser && (
          <Modal open={modalOpen} onClose={handleModalClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h6" component="h2" mb={2}>
                {selectedUser.username}'s Profile
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Role:</strong> {selectedUser.role}
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Status:</strong> {selectedUser.status}
              </Typography>
            </Box>
          </Modal>
        )}
      </Container>
    </ThemeProvider>
  );
}

// Rest of the code for UserStatistics, UserSearch, UserManagement...

const UserStatistics = ({ users }) => {
  const activeUsers = (users || []).filter((user) => user.status === 'active').length;
  const restrictedUsers = (users || []).filter((user) => user.status === 'restricted').length;
  const totalUsers = (users || []).length;

  return (
    <Card sx={{ mb: 4, boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)' }}>
      <CardHeader title="User Statistics" sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center' }} />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="h6" color="primary">Active Users: {activeUsers}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="warning.main">Restricted Users: {restrictedUsers}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" color="secondary">Total Users: {totalUsers}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const UserSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <Card sx={{ mb: 4, boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)' }}>
      <CardHeader title="Search Users" sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center' }} />
      <CardContent>
        <InputBase
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            mb: 2,
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            transition: 'border-color 0.3s ease',
            '&:focus-within': { borderColor: '#3f51b5' }
          }}
        />
      </CardContent>
    </Card>
  );
};

const UserManagement = ({ users, handleModalOpen }) => {
  return (
    <Card sx={{ mb: 4, boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)' }}>
      <CardHeader title="User Management" sx={{ backgroundColor: '#3f51b5', color: '#fff', textAlign: 'center' }} />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead sx={{ backgroundColor: '#424242' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff' }}><strong>Username</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Email</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Role</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Status</strong></TableCell>
                <TableCell sx={{ color: '#fff' }}><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id} hover>
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
                    <TableCell>
                      <Typography 
                        sx={{ 
                          color: user.status === 'active' ? 'success.main' : 'error.main', 
                          fontWeight: 'bold' 
                        }}
                      >
                        {user.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton 
                        onClick={() => toggleUser(
                          user._id, 
                          user.status === 'active' ? 'restricted' : 'active', 
                          user.role
                        )}
                        color={user.status === 'active' ? 'success' : 'warning'}
                        sx={{ transition: 'color 0.3s ease' }}
                      >
                        {user.status === 'active' ? <LockOpen /> : <Lock />}
                      </IconButton>
                      <IconButton 
                        onClick={() => removeUser(user._id)} 
                        color="error" 
                        sx={{ transition: 'color 0.3s ease' }}
                      >
                        <Delete />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleModalOpen(user)} 
                        color="info" 
                        sx={{ transition: 'color 0.3s ease' }}
                      >
                        <Info />
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
        </TableContainer>
      </CardContent>
    </Card>
  );
};
