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


  const { user } = useAuthentication();


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/");
        setEvents(response.data);
        setFilteredEvents(response.data);
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
              href="/events/new"
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
                        {event.date.split("T")[0]}
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
                Date: {selectedEvent?.date.split("T")[0]}
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
        </Container>
      </Box>
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}