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

export default function Events() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/events");
      if (response.status === 200) {
        setEvents(response.data);
      } else {
        console.error("Failed to fetch events:", response.data);
        alert("Failed to fetch events.");
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      alert("Error fetching events. Please try again later.");
    }
  };

  const removeEvent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/events/${id}`);
      if (response.status === 200) {
        alert('Event deleted successfully');
        setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
      } else {
        console.error('Error deleting event:', response.data);
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  };

  const filteredEvents = (events || []).filter(
    (event) =>
      (event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.organizer && event.organizer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalEvents = (events || []).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Events Management
      </Typography>

      {/* Event Statistics Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Event Statistics" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h6">Total Events: {totalEvents}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Event Search Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Search Events" />
        <CardContent>
          <InputBase
            placeholder="Search by name or organizer"
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

      {/* Event Management Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Event Management" />
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Organizer</strong></TableCell>
                  <TableCell><strong>Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.map((event) => (
                    <TableRow key={event._id}>
                      <TableCell>{event.name}</TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeEvent(event._id)} color="error">
                          <Delete />
                        </IconButton>
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
        </CardContent>
      </Card>
    </Container>
  );
}
