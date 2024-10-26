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
} from "@mui/material";
import { CalendarMonth, Info } from "@mui/icons-material";
import { useTranslation } from 'react-i18next'; 

export default function Events() {
  const { t } = useTranslation(); 
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/events/latest");
        const formattedEvents = response.data.map(event => ({
          ...event,
          date: new Date(event.date).toLocaleDateString(),
          time: new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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
        py: 6,
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
      }}
    >
      <Container sx={{ paddingBottom: 7, paddingTop: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {t('Events.ExploreEvents')}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          {t('Events.EventsInfo')}
        </Typography>
        <Grid container spacing={2}>
          {events.map((event, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: event.highlighted ? "#6366f1" : "white",
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
              {t('Events.Date')}: {selectedEvent?.date}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {t('Events.Location')}: {selectedEvent?.location}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {t('Events.Time')}: {selectedEvent?.time}
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
              {t('Events.Close')}
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}
