import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { People, EventAvailable, WorkOutline, Forum } from "@mui/icons-material";

const steps = [
  {
    icon: <People fontSize="large" />,
    title: "Community",
    description:
      "Connect with like-minded individuals in your community, share resources, and stay connected.",
  },
  {
    icon: <EventAvailable fontSize="large" />,
    title: "Community Events",
    description:
      "Never miss out on important community events and networking opportunities.",
  },
  {
    icon: <WorkOutline fontSize="large" />,
    title: "Jobs & Learnerships",
    description: "Our NGOs help you apply for jobs, learn about careers, and develop your skills.",
  },
  {
    icon: <Forum fontSize="large" />,
    title: "Communication",
    description:
      "We community blogs and forums to share ideas, ask questions, and connect with others.",
  },
];

export default function Services() {
  return (
    <Box sx={{ py: 8, px: 2, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          What you can do and get on our platform
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 6 }}>
        Whether you're seeking support, opportunities, and connections<br/> 
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {steps.map((step, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)',
                  borderRadius: "16px",
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "#6c63ff",
                    color: "#ffffff",
                    borderRadius: "16px",
                    mb: 2,
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">{step.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Button sx={{ borderRadius: '15px', backgroundColor: "#6c63ff", color: "#ffffff", textTransform: "none", padding: "8px 30px", mt: 6 }} size="large">
          Get Started
        </Button>
      </Container>
    </Box>
  );
}
