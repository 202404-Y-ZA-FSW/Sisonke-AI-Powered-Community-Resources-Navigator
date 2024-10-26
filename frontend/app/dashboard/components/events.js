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
import EventIcon from '@mui/icons-material/Event';
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

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const eventsPerPage = 10;
  const theme = useTheme();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/events");
      if (response.status === 200) {
        setEvents(response.data);
      } else {
        showSnackbar("Failed to fetch events.");
      }
    } catch (err) {
      showSnackbar("Error fetching events. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const removeEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/events/${id}`);
      if (response.status === 200) {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
        showSnackbar("Event deleted successfully.");
      } else {
        showSnackbar('Failed to delete event');
      }
    } catch (error) {
      showSnackbar('Error deleting event. Please try again.');
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

  const sortedEvents = React.useMemo(() => {
    let sortableEvents = [...events];
    if (sortConfig !== null) {
      sortableEvents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEvents;
  }, [events, sortConfig]);

  const filteredAndSortedEvents = React.useMemo(() => {
    return sortedEvents.filter(
      (event) =>
        (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.organizer?.username && event.organizer.username.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [sortedEvents, searchQuery]);

  const paginatedEvents = React.useMemo(() => {
    const start = (currentPage - 1) * eventsPerPage;
    return filteredAndSortedEvents.slice(start, start + eventsPerPage);
  }, [filteredAndSortedEvents, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedEvents.length / eventsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const totalEvents = events.length;

  const handleViewEvent = (event) => {
    setSelectedEvent(event);
    setDialogMode('view');
    setDialogOpen(true);
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setDialogMode('edit');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleSaveEdit = async () => {
    // Implement the logic to save the edited event
    // This is just a placeholder
    showSnackbar("Event updated successfully.");
    handleCloseDialog();
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
                Event Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AnimatedIcon>
                <EventIcon sx={{ fontSize: 40, color: 'white' }} />
              </AnimatedIcon>
            </Grid>
          </Grid>
        </ColoredPaper>
      </Fade>

      <Zoom in={true} timeout={800}>
        <GlassCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Event Statistics</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body1">Total Events: {totalEvents}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </GlassCard>
      </Zoom>

      <Fade in={true} timeout={1000}>
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6" gutterBottom>Search Events</Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by location or organizer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={fetchEvents}>
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
          <Typography variant="h6" gutterBottom>Event Management</Typography>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <TableContainer>
                <Table stickyHeader aria-label="event management table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'location'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('location')}
                        >
                          Location
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'organizer'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('organizer')}
                        >
                          Organizer
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortConfig.key === 'date'}
                          direction={sortConfig.direction}
                          onClick={() => handleSort('date')}
                        >
                          Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedEvents.length > 0 ? (
                      paginatedEvents.map((event) => (
                        <TableRow key={event._id}>
                          <TableCell>{event.location}</TableCell>
                          <TableCell>{event.organizer?.username || "Unknown"}</TableCell>
                          <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Tooltip title="View Event">
                              <IconButton onClick={() => handleViewEvent(event)} color="primary">
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit Event">
                              <IconButton onClick={() => handleEditEvent(event)} color="secondary">
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Event">
                              <IconButton onClick={() => removeEvent(event._id)} color="error">
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          No events found
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
        <DialogTitle>{dialogMode === 'view' ? 'View Event' : 'Edit Event'}</DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <>
              <TextField
                fullWidth
                label="Location"
                value={selectedEvent.location}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2, mt: 2 }}
              />
              <TextField
                fullWidth
                label="Organizer"
                value={selectedEvent.organizer?.username || "Unknown"}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Date"
                value={new Date(selectedEvent.date).toLocaleDateString()}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Description"
                value={selectedEvent.description || "No description available"}
                disabled={dialogMode === 'view'}
                multiline
                rows={4}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Attendees"
                value={selectedEvent.attendees ? selectedEvent.attendees.join(', ') : "No attendees"}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Category"
                value={selectedEvent.category || "Uncategorized"}
                disabled={dialogMode === 'view'}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Ticket Price"
                value={selectedEvent.ticketPrice ? `$${selectedEvent.ticketPrice}` : "Free"}
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