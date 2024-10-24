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
  Fade,
  Chip,
} from "@mui/material";
import { CalendarMonth, LocationOn, AccessTime, Close } from "@mui/icons-material";
import { motion } from "framer-motion";
import { format } from 'date-fns';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

export default function Events() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/latest");
        const formattedEvents = response.data.map(event => ({
          ...event,
          formattedDate: format(new Date(event.date), 'MMMM d, yyyy'),
          formattedTime: format(new Date(event.date), 'HH:mm:ss')
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        py: 10,
        background: "linear-gradient(135deg, #6c63ff 0%, #ff6584 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            color: "white",
            fontWeight: 700,
            mb: 4,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Discover Exciting Events
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ mb: 8, color: "rgba(255,255,255,0.8)" }}
        >
          Connect with your community through local happenings
        </Typography>
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionCard
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  background: event.highlighted 
                    ? "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)"
                    : "white",
                  color: event.highlighted ? "white" : "inherit",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 600 }}>
                    {event.title}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <CalendarMonth sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {event.formattedDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="body2">
                      {event.formattedTime}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {event.description.substring(0, 100)}...
                  </Typography>
                  <Chip 
                    label={event.category} 
                    sx={{ 
                      bgcolor: event.highlighted ? 'rgba(255,255,255,0.2)' : '#6c63ff',
                      color: event.highlighted ? 'white' : 'white',
                    }} 
                  />
                </CardContent>
                <Button
                  variant="contained"
                  onClick={() => handleOpen(event)}
                  sx={{
                    mt: 2,
                    bgcolor: event.highlighted ? 'white' : '#6c63ff',
                    color: event.highlighted ? '#6c63ff' : 'white',
                    '&:hover': {
                      bgcolor: event.highlighted ? 'rgba(255,255,255,0.9)' : '#5753e4',
                    },
                  }}
                >
                  Learn More
                </Button>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <MotionBox
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: '90%', sm: 500 },
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Button
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </Button>
              <Typography id="modal-modal-title" variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
                {selectedEvent?.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                {selectedEvent?.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CalendarMonth sx={{ mr: 2, color: '#6c63ff' }} />
                <Typography variant="body1">
                  {selectedEvent?.formattedDate}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 2, color: '#6c63ff' }} />
                <Typography variant="body1">
                  {selectedEvent?.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AccessTime sx={{ mr: 2, color: '#6c63ff' }} />
                <Typography variant="body1">
                  {selectedEvent?.formattedTime}
                </Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                onClick={handleClose}
                sx={{
                  mt: 2,
                  bgcolor: '#6c63ff',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#5753e4',
                  },
                }}
              >
                Close
              </Button>
            </MotionBox>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
}