import React from "react";
import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import {
  People,
  EventAvailable,
  WorkOutline,
  Forum,
} from "@mui/icons-material";
import { useTranslation } from 'react-i18next';

const steps = [
  {
    icon: <People fontSize="large" />,
    titleKey: "Services.Community",
    descriptionKey: "Services.CommunityDescription",
  },
  {
    icon: <EventAvailable fontSize="large" />,
    titleKey: "Services.Events",
    descriptionKey: "Services.EventsDescription",
  },
  {
    icon: <WorkOutline fontSize="large" />,
    titleKey: "Services.Jobs",
    descriptionKey: "Services.JobsDescription",
  },
  {
    icon: <Forum fontSize="large" />,
    titleKey: "Services.Communication",
    descriptionKey: "Services.CommunicationDescription",
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: 8, px: 2, textAlign: "center" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          {t('Services.Title')}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 6 }}>
          {t('Services.Subtitle')}
          <br />
 
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
                  background:
                    "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
                  borderRadius: "16px",
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "all 0.3s",
                  },
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
                  {t(step.titleKey)}  
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t(step.descriptionKey)} 
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>


        <Button
          sx={{
            borderRadius: "15px",
            backgroundColor: "#6c63ff",
            color: "#ffffff",
            textTransform: "none",
            padding: "8px 30px",
            mt: 6,
          }}
          size="large"
        >
          {t('Services.GetStarted')}
        </Button>

      </Container>
    </Box>
  );
}
