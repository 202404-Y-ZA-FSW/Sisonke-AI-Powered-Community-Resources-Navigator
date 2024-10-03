'use client';

import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Card, 
  CardContent, 
  Box 
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';  // Updated import
import Image from 'next/image';

const StyledCard = styled(Card)(({ theme }) => {
  const defaultTheme = useTheme();  // Use the default theme
  return {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      boxShadow: defaultTheme.shadows ? defaultTheme.shadows[4] : '0px 4px 6px rgba(0, 0, 0, 0.1)',  // Safe fallback
    },
  };
});

const NumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

export default function AboutUs() {
  const sections = [
    {
      number: '1.',
      title: 'Who We Are',
      description: 'Sisonke is a community-driven platform connecting local resources, opportunities, and people in South African townships.',
    },
    {
      number: '2.',
      title: 'What We Do',
      description: 'We provide a digital hub for job listings, events, forums, and local business promotion to empower our community.',
    },
    {
      number: '3.',
      title: 'How We Help',
      description: 'Through our platform, we facilitate connections, share knowledge, and create opportunities for growth and development.',
    },
    {
      number: '4.',
      title: 'Create Success Stories',
      description: 'By bringing together community members, businesses, and resources, we help individuals achieve their goals and thrive.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ height: '100vh', overflowY: 'auto', mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Button variant="contained" color="primary">
          Learn more
        </Button>
      </Box>
      <Typography variant="h5" sx={{ mb: 4 }}>
        At Sisonke, we take pride in our commitment to community empowerment, 
        connection, and growth in South African townships.
      </Typography>
      <Grid container spacing={4}>
        {sections.map((section) => (
          <Grid item xs={12} md={6} key={section.title}>
            <StyledCard>
              <CardContent>
                <NumberTypography>{section.number}</NumberTypography>
                <Typography variant="h4" component="h2" gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1">
                  {section.description}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Image
                src="/placeholder.svg"
                alt="Community gathering"
                height={150}
                width={400}
                layout="responsive"
                objectFit="contain"
              />
            </Grid>
            <Grid item xs={6}>
              <Image
                src="/placeholder.svg"
                alt="Local business owner"
                height={150}
                width={200}
                layout="responsive"
                objectFit="contain"
              />
            </Grid>
            <Grid item xs={6}>
              <Image
                src="/placeholder.svg"
                alt="Community event"
                height={150}
                width={200}
                layout="responsive"
                objectFit="contain"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
