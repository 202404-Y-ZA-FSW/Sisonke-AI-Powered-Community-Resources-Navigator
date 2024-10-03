"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Modal,
  Button,
  CircularProgress,
} from "@mui/material";
import { CalendarMonth, Info } from "@mui/icons-material";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box
      sx={{
        py: 6,
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        color: "black", // Added to make the text black
      }}
    >
      <Container sx={{ paddingBottom: 7, paddingTop: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore the awesome events <br /> happening in your area
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Events are shared by local businesses, organizations, and community
          groups.
        </Typography>

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event._id}>
                <Card
                  sx={{
                    boxShadow: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: event.isFeatured ? "#6366f1" : "white",
                    color: event.isFeatured ? "white" : "inherit",
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
                        {new Date(event.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Info
                    sx={{
                      mr: 2,
                      color: event.isFeatured ? "white" : "#6366f1",
                      cursor: "pointer",
                    }}
                    onClick={() => handleOpen(event)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

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
              Date: {new Date(selectedEvent?.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Location: {selectedEvent?.location}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Time: {selectedEvent?.startTime} - {selectedEvent?.endTime}
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
  );
}
