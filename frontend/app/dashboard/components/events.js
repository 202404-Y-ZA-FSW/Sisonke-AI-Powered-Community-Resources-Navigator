"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Paper,
  Typography,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Grid,
  Box,
  Snackbar,
  Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); 

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      if (response.status === 200) {
        setEvents(response.data);
      } else {
        setError("Failed to fetch events.");
      }
    } catch (err) {
      setError("Error fetching events. Please try again later.");
    }
  };

  const removeEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/events/${id}`);
      if (response.status === 200) {
        setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
        setSuccessMessage("Event deleted successfully."); 
      } else {
        setError('Failed to delete event');
      }
    } catch (error) {
      setError('Error deleting event. Please try again.');
    }
  };

  const filteredEvents = (events || []).filter(
    (event) =>
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) || 
      (event.organizer?.username && event.organizer.username.toLowerCase().includes(searchQuery.toLowerCase())) 
  );

  const totalEvents = (events || []).length;

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
      {/* Event Statistics Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Event Statistics</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="body1" textAlign="center">Total Events: {totalEvents}</Typography>
          </Grid>
        </Grid>
      </Paper>

      {/* Event Search Section */}
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Search Events</Typography>
        <InputBase
          placeholder="Search by location or organizer"
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
      </Paper>

      {/* Event Management Section */}
      <Paper elevation={3} sx={{ p: 2, flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>Event Management</Typography>
        <TableContainer component={Box} sx={{ overflow: 'auto' }}>
          <Table stickyHeader aria-label="event management table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Organizer</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.organizer?.username || "Unknown"}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Delete />}
                        onClick={() => removeEvent(event._id)} 
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
                  <TableCell colSpan={4} align="center">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Snackbar for error messages */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />

      {/* Snackbar for success messages */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
        message={successMessage}
      />
    </Box>
  );
}