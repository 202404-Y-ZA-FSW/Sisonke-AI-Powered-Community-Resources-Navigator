"use client"

import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Switch, 
  Box, 
  Typography, 
  Container, 
  Grid,
  Paper 
} from '@mui/material';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    category: 'Job Fair',
    description: '',
    isFree: true,
    eventUrl: '',
    attendeeLimit: 0,
    startTime: '',
    endTime: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Event created!');
        // Optionally redirect or show a success message
      } else {
        const errorData = await response.json();
        console.error('Error creating event:', errorData);
        // Display error messages to the user
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ mt: 4, mb: 4, p: 4, backgroundColor: 'white' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  <MenuItem value="Job Fair">Job Fair</MenuItem>
                  <MenuItem value="Health Drive">Health Drive</MenuItem>
                  <MenuItem value="Education">Education</MenuItem>
                  <MenuItem value="Community">Community</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isFree}
                    onChange={handleChange}
                    name="isFree"
                  />
                }
                label="Free Event"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event URL"
                name="eventUrl"
                value={formData.eventUrl}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Attendee Limit"
                name="attendeeLimit"
                type="number"
                value={formData.attendeeLimit}
                onChange={handleChange}
                inputProps={{ min: 0 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Time"
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Time"
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Create Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EventForm;