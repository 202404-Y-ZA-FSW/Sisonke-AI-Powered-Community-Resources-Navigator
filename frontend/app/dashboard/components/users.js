
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
import { useTranslation } from 'react-i18next'; // Import useTranslation


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
  const { t } = useTranslation(); // Initialize translation
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const theme = useTheme();

  
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
        showSnackbar(t("userDashboard.fetchError"));
      }
    } catch (err) {
      showSnackbar(t("userDashboard.fetchError"));
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/account/remove`, { data: { userId: id } });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
        showSnackbar(t("userDashboard.userDeleted"));
      } else {
        showSnackbar(t("userDashboard.deleteError"));
      }
    } catch (error) {
      showSnackbar(t("userDashboard.deleteError"));
    }
  };

  const toggleUser = async (id, status, role) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, status, role });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, status, role } : user));
        showSnackbar(t("userDashboard.userUpdated"));
      } else {
        showSnackbar(t("userDashboard.updateError"));
      }
    } catch (err) {
      showSnackbar(t("userDashboard.generalError"));
    }
  };

  const changeUserRole = async (id, newRole) => {
    try {
      const response = await axios.put(`http://localhost:5000/account/update`, { userId: id, role: newRole });
      if (response.status === 200) {
        setUsers(prevUsers => prevUsers.map(user => user._id === id ? { ...user, role: newRole } : user));
        showSnackbar(t("userDashboard.roleUpdated"));
      } else {
        showSnackbar(t("userDashboard.roleUpdateError"));
      }
    } catch (err) {
      showSnackbar(t("userDashboard.generalError"));
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
        showSnackbar(t("userDashboard.userUpdated"));
        setEditDialogOpen(false);
        setCurrentEditUser(null);
      } else {
        showSnackbar(t("userDashboard.updateError"));
      }
    } catch (err) {
      showSnackbar(t("userDashboard.generalError"));
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
      showSnackbar(t("users.exportSuccess"));
    } catch (err) {
      showSnackbar(t("users.exportError")); 
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
            {t("userDashboard.title")} 
          </Typography>
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <GlassCard elevation={5}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ mb: 2, fontWeight: 700, fontSize: '1.25rem' }}>
                      {t("userDashboard.activeUsers")} 
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
                      {t("userDashboard.restrictedUsers")} 
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
                      {t("userDashboard.totalUsers")}
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
          <Typography variant="h5" gutterBottom>{t("userDashboard.searchUsers")}</Typography> 
          <Tooltip title={t("userDashboard.refreshUsers")}>
            <IconButton onClick={fetchUsers} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-role-label">{t("userDashboard.role")}</InputLabel> 
            <Select
              labelId="filter-role-label"
              name="role"
              value={filters.role}
              label={t("userDashboard.role")} 
              onChange={handleFilterChange}
            >
              <MenuItem value="all">{t("userDashboard.all")}</MenuItem> 
              <MenuItem value="user">{t("userDashboard.user")}</MenuItem>
              <MenuItem value="administrator">{t("userDashboard.admin")}</MenuItem> 
              <MenuItem value="ngo">{t("userDashboard.ngo")}</MenuItem> 
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="filter-status-label">{t("userDashboard.status")}</InputLabel> 
            <Select
              labelId="filter-status-label"
              name="status"
              value={filters.status}
              label={t("userDashboard.status")} 
              onChange={handleFilterChange}
            >
              <MenuItem value="all">{t("userDashboard.all")}</MenuItem> 
              <MenuItem value="active">{t("userDashboard.active")}</MenuItem>
              <MenuItem value="restricted">{t("userDashboard.restricted")}</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            placeholder={t("userDashboard.searchPlaceholder")}
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
            {exporting ? t("userDashboard.exporting") : t("userDashboard.exportCSV")}
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', borderRadius: '20px', background: '#ffffff' }}>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
    <Typography variant="h5" gutterBottom>{t('UserManagement.title')}</Typography>
    {selectedUsers.length > 0 && (
      <Box>
        <Tooltip title={t('UserManagement.deleteSelected')}>
          <IconButton onClick={() => {
            selectedUsers.forEach(id => removeUser(id));
            setSelectedUsers([]);
          }} color="error">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('UserManagement.lockSelected')}>
          <IconButton onClick={() => {
            selectedUsers.forEach(id => toggleUser(id, 'restricted', null));
            setSelectedUsers([]);
          }} color="primary">
            <LockIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('UserManagement.unlockSelected')}>
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
                  {t('UserManagement.username')}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'email'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('email')}
                >
                  {t('UserManagement.email')}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'role'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('role')}
                >
                  {t('UserManagement.role')}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'status'}
                  direction={sortConfig.direction}
                  onClick={() => handleSort('status')}
                >
                  {t('UserManagement.status')}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                {t('UserManagement.actions')}
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
                          <MenuItem value="user">{t('UserManagement.user')}</MenuItem>
                          <MenuItem value="administrator">{t('UserManagement.admin')}</MenuItem>
                          <MenuItem value="ngo">{t('UserManagement.ngo')}</MenuItem>
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
                      <Tooltip title={t('UserManagement.viewUserDetails')}>
                        <IconButton onClick={() => handleViewClick(user)} color="info">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={t('UserManagement.editUser')}>
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
                        {user.status === 'active' ? t('UserManagement.lock') : t('UserManagement.unlock')}
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => removeUser(user._id)}
                        color="error"
                        variant="contained"
                        size="small"
                      >
                        {t('UserManagement.delete')}
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">{t('UserManagement.noUsersFound')}</TableCell>
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
  <DialogTitle>{t('UserManagement.editUser')}</DialogTitle>
  <DialogContent>
    {currentEditUser && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

      
        <TextField
          label={t('UserManagement.username')}
          value={currentEditUser.username}
          onChange={(e) => setCurrentEditUser({ ...currentEditUser, username: e.target.value })}
          fullWidth
        />
        <TextField
          label={t('UserManagement.email')}
          value={currentEditUser.email}
          onChange={(e) => setCurrentEditUser({ ...currentEditUser, email: e.target.value })}
          fullWidth
        />
        
        <FormControl fullWidth>
  <InputLabel id="edit-role-label">{t('UserManagement.role')}</InputLabel>
  <Select
    labelId="edit-role-label"
    value={currentEditUser.role}
    label={t('UserManagement.role')}
    onChange={(e) => setCurrentEditUser({ ...currentEditUser, role: e.target.value })}
  >
    <MenuItem value="user">{t('UserManagement.user')}</MenuItem>
    <MenuItem value="administrator">{t('UserManagement.admin')}</MenuItem>
    <MenuItem value="ngo">{t('UserManagement.ngo')}</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth>
  <InputLabel id="edit-status-label">{t('UserManagement.status')}</InputLabel>
  <Select
    labelId="edit-status-label"
    value={currentEditUser.status}
    label={t('UserManagement.status')}
    onChange={(e) => setCurrentEditUser({ ...currentEditUser, status: e.target.value })}
  >
    <MenuItem value="active">{t('UserManagement.active')}</MenuItem>
    <MenuItem value="restricted">{t('UserManagement.restricted')}</MenuItem>
  </Select>
</FormControl>
</Box>
)}
</DialogContent>
<DialogActions>
  <Button onClick={() => setEditDialogOpen(false)}>{t('UserManagement.cancel')}</Button>
  <Button onClick={handleEditSave} variant="contained" color="primary">{t('UserManagement.save')}</Button>
</DialogActions>
</Dialog>

{/* View User Details Dialog */}
<Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} fullWidth maxWidth="md">
  <DialogTitle>{t('UserManagement.viewUserDetails')}</DialogTitle>
  <DialogContent>
    {viewUser && (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">{t('UserManagement.username')}: {viewUser.username}</Typography>
        <Typography variant="body1">{t('UserManagement.email')}: {viewUser.email}</Typography>
        <Typography variant="body1">{t('UserManagement.role')}: {viewUser.role}</Typography>
        <Typography variant="body1">{t('UserManagement.status')}: {viewUser.status}</Typography>
        <Typography variant="body1">{t('UserManagement.createdAt')}: {new Date(viewUser.createdAt).toLocaleString()}</Typography>
        <Typography variant="body1">{t('UserManagement.lastUpdated')}: {new Date(viewUser.updatedAt).toLocaleString()}</Typography>
        
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setViewDialogOpen(false)}>{t('UserManagement.close')}</Button>
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
