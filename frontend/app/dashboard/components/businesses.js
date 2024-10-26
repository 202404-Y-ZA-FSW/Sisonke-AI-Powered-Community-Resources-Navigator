"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Snackbar,
  IconButton,
  Tooltip,
  useTheme,
  Card,
  CardContent,
  Fade,
  Zoom,
  Pagination,
  Stack,
  TableSortLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

export default function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const businessesPerPage = 10;
  const theme = useTheme();

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/business/all");
      if (response.status === 200) {
        setBusinesses(response.data.businesses || response.data || []);
      } else {
        showSnackbar("Failed to fetch businesses.");
      }
    } catch (err) {
      showSnackbar("Error fetching businesses. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeBusiness = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/business/${id}`);
      if (response.status === 200) {
        setBusinesses(prevBusinesses => prevBusinesses.filter(business => business._id !== id));
        showSnackbar("Business deleted successfully.");
      } else {
        showSnackbar('Failed to delete business');
      }
    } catch (error) {
      showSnackbar('Error deleting business. Please try again.');
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBusinesses = React.useMemo(() => {
    let sortableBusinesses = [...businesses];
    if (sortConfig !== null) {
      sortableBusinesses.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBusinesses;
  }, [businesses, sortConfig]);

  const filteredAndSortedBusinesses = React.useMemo(() => {
    return sortedBusinesses.filter(
      (business) =>
        (business.name && business.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (business.owner?.username && business.owner.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedBusinesses, searchQuery]);

  const paginatedBusinesses = React.useMemo(() => {
    const start = (currentPage - 1) * businessesPerPage;
    return filteredAndSortedBusinesses.slice(start, start + businessesPerPage);
  }, [filteredAndSortedBusinesses, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedBusinesses.length / businessesPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalBusinesses = businesses.length;

  const handleViewBusiness = (business) => {
    setSelectedBusiness(business);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEditBusiness = (business) => {
    setSelectedBusiness(business);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedBusiness(null);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/business/${selectedBusiness._id}`, selectedBusiness);
      if (response.status === 200) {
        setBusinesses(prevBusinesses => 
          prevBusinesses.map(business => 
            business._id === selectedBusiness._id ? selectedBusiness : business
          )
        );
        showSnackbar("Business updated successfully");
        handleCloseDialog();
      } else {
        showSnackbar('Failed to update business');
      }
    } catch (error) {
      showSnackbar('Error updating business. Please try again.');
    }
  };

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
        <ColoredPaper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'white' }}>
                Business Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AnimatedIcon>
                <BusinessIcon sx={{ fontSize: 40, color: 'white' }} />
              </AnimatedIcon>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Zoom in={true} timeout={800}>
        <GlassCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Business Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Total Businesses: {totalBusinesses}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>
      </Zoom>

      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Search Businesses</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name or owner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchBusinesses}>
                    <RefreshIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Fade>

      <Fade in={true} timeout={1200}>
        <Paper elevation={3} sx={{ p: 3, flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>Business Management</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="business management table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'name'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('name')}
                        >
                          Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'owner'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('owner')}
                        >
                          Owner
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'createdAt'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('createdAt')}
                        >
                          Date Created
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedBusinesses.length > 0 ? (
                      paginatedBusinesses.map((business) => (
                        <TableRow key={business._id}>
                          <TableCell>{business.name}</TableCell>
                          <TableCell>{business.owner?.username || "Unknown"}</TableCell>
                          <TableCell>{new Date(business.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Tooltip title="View Business">
                              <IconButton onClick={() => handleViewBusiness(business)} color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Business">
                              <IconButton onClick={() => handleEditBusiness(business)} color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Business">
                              <IconButton onClick={() => removeBusiness(business._id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
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
              <Stack spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
              </Stack>
            </>
          )}
        </Paper>
      </Fade>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMode === 'view' ? 'View Business' : 'Edit Business'}</DialogTitle>
        <DialogContent>
          {selectedBusiness && (
            <>
              <TextField
                fullWidth
                label="Name"
                value={selectedBusiness.name}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, name: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Owner"
                value={selectedBusiness.owner?.username || "Unknown"}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, owner: {...selectedBusiness.owner, username: e.target.value}})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date Created"
                value={new Date(selectedBusiness.createdAt).toLocaleDateString()}
                disabled
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={selectedBusiness.description || ""}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, description: e.target.value})}
                disabled={dialogMode === 'view'}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                value={selectedBusiness.address || ""}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, address: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                value={selectedBusiness.phone || ""}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, phone: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                value={selectedBusiness.email || ""}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, email: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Website"
                value={selectedBusiness.website || ""}
                onChange={(e) => setSelectedBusiness({...selectedBusiness, website: e.target.value})}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
          {dialogMode === 'edit' && <Button onClick={handleSaveEdit}>Save</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
