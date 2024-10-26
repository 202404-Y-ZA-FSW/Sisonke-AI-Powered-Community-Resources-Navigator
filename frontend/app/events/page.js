"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Modal,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import { CalendarMonth, Info } from "@mui/icons-material";
import Subscribe from "../components/sections/Subscribe";
import Footer from "../components/sections/Footer";
import Navigation from "../components/sections/Navigation";
import SearchIcon from "@mui/icons-material/Search";

import { useAuthentication } from "../hooks/useAuthentication";

export default function Events() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [newEventModalOpen, setNewEventModalOpen] = useState(false);
  const [newEventFormData, setNewEventFormData] = useState({
    title: "",
    location: "",
    date: "",
    category: "",
    description: "",
    isFree: true,
    eventUrl: "",
    attendeeLimit: 0,
    startTime: "",
    endTime: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { user } = useAuthentication();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/");
        const formattedEvents = response.data.map(event => ({
          ...event,
          date: new Date(event.date).toLocaleDateString(),
          time: new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setEvents(formattedEvents);
        setFilteredEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const results = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(results);
  }, [searchTerm, events]);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewEventModalOpen = () => {
    setNewEventModalOpen(true);
  };

  const handleNewEventModalClose = () => {
    setNewEventModalOpen(false);
    setNewEventFormData({
      title: "",
      location: "",
      date: "",
      category: "",
      description: "",
      isFree: true,
      eventUrl: "",
      attendeeLimit: 0,
      startTime: "",
      endTime: "",
      address: "",
    });
    setErrors({});
  };

  const handleNewEventFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEventFormData({
      ...newEventFormData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newEventFormData.title) errors.title = "Title is required";
    if (!newEventFormData.address) errors.address = "Address is required";
    if (!newEventFormData.startTime) errors.startTime = "Start time is required";
    if (!newEventFormData.endTime) errors.endTime = "End time is required";
    if (!newEventFormData.description) errors.description = "Description is required";
    if (!newEventFormData.category) errors.category = "Category is required";
    return errors;
  };

  const handleNewEventSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/events/",
        { ...newEventFormData, organizer: user.user.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setSnackbar({
          open: true,
          message: "Event created successfully!",
          severity: "success",
        });
        handleNewEventModalClose();
        // Refresh events list
        const updatedEvents = await axios.get("http://localhost:5000/events/");
        setEvents(updatedEvents.data);
      } else {
        setSnackbar({
          open: true,
          message: "Failed to create an event",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setSnackbar({
        open: true,
        message: `An error occurred while creating the event: ${err.message}`,
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <React.Fragment>
      <Navigation />
      <Box
        sx={{
          background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
          py: { xs: 4, md: 8 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.75rem" },
            }}
          >
            Explore Community Events
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            Never miss an event, join us and stay updated.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mb: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                sx: { borderRadius: "16px", width: "100%" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          paddingTop: 4,
        }}
      >
        <Container sx={{ paddingBottom: 7, paddingTop: 6 }}>
          {user ? (
            <Button
              color="primary"
              onClick={handleNewEventModalOpen}
              sx={{
                mb: 2,
                backgroundColor: "#6c63ff",
                color: "#ffffff",
                borderRadius: "16px",
                padding: "15px 24px",
                textTransform: "none",
                "&:hover": { backgroundColor: "#5A52D5" },
              }}
            >
              Add New Event
            </Button>
          ) : (
            <Typography
              variant="body2"
              sx={{ marginBottom: 2, color: "#6c63ff" }}
            >
              You need to login to add a new event.
            </Typography>
          )}
          <Grid container spacing={2}>
            {filteredEvents.map((event, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    boxShadow: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background:
                      "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
                    color: event.highlighted ? "white" : "inherit",
                    borderRadius: "16px",
                    "&:hover": {
                      transform: "scale(1.02)",
                      transition: "all 0.3s",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {event.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <CalendarMonth />
                      <Typography sx={{ marginTop: "3px" }} variant="body2">
                        {event.date} at {event.time}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Info
                    sx={{
                      mr: 2,
                      color: event.highlighted ? "white" : "#6366f1",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpen(event)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ border: "2px solid #6366f1" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #6366f1",
                boxShadow: 24,
                borderRadius: "16px",
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedEvent?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedEvent?.description}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Date: {selectedEvent?.date}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Location: {selectedEvent?.location}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Time: {selectedEvent?.time}
              </Typography>
              <Button
                onClick={handleClose}
                sx={{
                  textTransform: "none",
                  mt: 2,
                  backgroundColor: "#6366f1",
                  color: "white",
                  padding: "8px 30px",
                  borderRadius: "16px",
                }}
              >
                Close
              </Button>
            </Box>
          </Modal>
          <Modal
            open={newEventModalOpen}
            onClose={handleNewEventModalClose}
            aria-labelledby="new-event-modal-title"
            aria-describedby="new-event-modal-description"
          >
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
                maxHeight: '90vh',
                overflowY: 'auto',
              }}
            >
              <Typography id="new-event-modal-title" variant="h6" component="h2" gutterBottom>
                Create New Event
              </Typography>
              <form onSubmit={handleNewEventSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Title"
                      name="title"
                      value={newEventFormData.title}
                      onChange={handleNewEventFormChange}
                      required
                      error={!!errors.title}
                      helperText={errors.title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Location"
                      name="location"
                      value={newEventFormData.location}
                      onChange={handleNewEventFormChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      name="date"
                      value={newEventFormData.date}
                      onChange={handleNewEventFormChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth error={!!errors.category}>
                      <InputLabel id="category-label">Category</InputLabel>
                      <Select
                        labelId="category-label"
                        name="category"
                        value={newEventFormData.category}
                        onChange={handleNewEventFormChange}
                        label="Category"
                      >
                        <MenuItem value="Job Fair">Job Fair</MenuItem>
                        <MenuItem value="Health Drive">Health Drive</MenuItem>
                        <MenuItem value="Education">Education</MenuItem>
                        <MenuItem value="Community">Community</MenuItem>
                      </Select>
                      {errors.category && (
                        <Typography color="error">{errors.category}</Typography>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      value={newEventFormData.description}
                      onChange={handleNewEventFormChange}
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={newEventFormData.address}
                      onChange={handleNewEventFormChange}
                      multiline
                      rows={3}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newEventFormData.isFree}
                          onChange={handleNewEventFormChange}
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
                      value={newEventFormData.eventUrl}
                      onChange={handleNewEventFormChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Attendee Limit"
                      name="attendeeLimit"
                      type="number"
                      value={newEventFormData.attendeeLimit}
                      onChange={handleNewEventFormChange}
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Start Time"
                      type="time"
                      name="startTime"
                      value={newEventFormData.startTime}
                      onChange={handleNewEventFormChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      error={!!errors.startTime}
                      helperText={errors.startTime}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="End Time"
                      type="time"
                      name="endTime"
                      value={newEventFormData.endTime}
                      onChange={handleNewEventFormChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      inputProps={{
                        step: 300, // 5 min
                      }}
                      error={!!errors.endTime}
                      helperText={errors.endTime}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Create Event
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>
        </Container>
      </Box>
      <Subscribe />
      <Footer />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}