import React, { useState } from "react";
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


const events = [
  {
    title: "Heritage Day",
    date: "26/09/2024",
    highlighted: true,
    description:
      "Wear your your traditional attires, enjoy traditional foods, and attend traditional events to celebrate the community's heritage.",
    location: "Soweto, Gauteng",
    time: "All Day",
  },
  {
    title: "Sisonke Stand Up Call",
    date: "26/09/2024",
    description:
      "This is a team meeting where you will tell us about your progress here is the link to join google meet",
    location: "Online",
    time: "10 AM - 12 PM",
  },
  {
    title: "Community Marathon Soweto",
    date: "27/09/2024",
    description:
      "Come and support the local community by participating in the marathon. Be prepared to give and receive valuable experiences.",
    location: "Soweto, Gauteng",
    time: "8 AM - 10 AM",
  },
  {
    title: "Joburg Health & Wellness",
    date: "28/09/2024",
    description:
      "Come and support the local community by participating in the health and wellness program. Be prepared to give and receive valuable experiences.",
    location: "Joburg, Johannesburg",
    time: "9 AM - 11 AM",
  },
  {
    title: "NSFAS Bursary Drive",
    date: "29/09/2024",
    description:
      "Get info about the NSFAS bursary drive. Apply by September 15th, 2024.",
    location: "Johannesburg",
    time: "10 AM - 12 PM",
  },
  {
    title: "Project Y State Of The Nation",
    date: "30/09/2024",
    description:
      "Get the progress of Project Y. Learn more about the project.",
    location: "Cape Town, Western Cape",
    time: "11 AM - 1 PM",
  },
];


export default function Events() {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);


  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };


  const handleClose = () => setOpen(false);


  return (
    <Box sx={{ py: 6, background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)' }}>
      <Container sx={{ paddingBottom: 7, paddingTop: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Explore the awesome events <br/> happening in your area
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Events are shared by local businesses, organizations, and community groups.
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
                    <CalendarMonth/>
                   <Typography sx={{ marginTop: "3px" }} variant="body2">{event.date}</Typography>
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
          sx={{ border: "2px solid #6366f1"}}
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
            <Button onClick={handleClose} sx={{ textTransform: "none", mt: 2, backgroundColor: "#6366f1", color: "white", padding: "8px 30px", borderRadius: "16px" }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}
