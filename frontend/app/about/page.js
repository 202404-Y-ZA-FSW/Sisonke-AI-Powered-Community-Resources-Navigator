"use client";

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Paper,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Image from "next/image";
import Hero from "./hero";
import Footer from "../components/sections/Footer";
import Subscribe from "../components/sections/Subscribe";
import Navigation from "../components/sections/Navigation";

// Styled components
const StyledCard = styled(Card)(({ theme }) => {
  const defaultTheme = useTheme();
  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "16px",
    boxShadow: "none",
    background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
    "&:hover": {
      boxShadow: defaultTheme.shadows
        ? defaultTheme.shadows[4]
        : "0px 4px 6px rgba(0, 0, 0, 0.1)",
    },
  };
});

const NumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#6c63ff",
  marginBottom: theme.spacing(2),
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ImageCaption = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(1),
  backgroundColor: 'rgba(108, 99, 255, 0.7)',
  color: '#fff',
  textAlign: 'center',
  fontSize: '0.9rem',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fff5e6 0%, #e6f7ff 100%)',
  borderRadius: '16px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
}));

// Main component
export default function AboutUs() {
  const sections = [
    {
      number: "1.",
      title: "Who We Are",
      description:
        "Sisonke is a community-driven platform connecting local resources, opportunities, and people in South African townships.",
    },
    {
      number: "2.",
      title: "What We Do",
      description:
        "We provide a digital hub for job listings, events, forums, and local business promotion to empower our community.",
    },
    {
      number: "3.",
      title: "How We Help",
      description:
        "Through our platform, we facilitate connections, share knowledge, and create opportunities for growth and development.",
    },
    {
      number: "4.",
      title: "Create Success Stories",
      description:
        "By bringing together community members, businesses, and resources, we help individuals achieve their goals and thrive.",
    },
  ];

  return (
    <React.Fragment>
      <Navigation />
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 15, mb: 15 }}>
        <Grid container spacing={4}>
          {sections.map((section) => (
            <Grid item xs={12} md={6} key={section.title}>
              <StyledCard>
                <CardContent>
                  <NumberTypography>{section.number}</NumberTypography>
                  <Typography variant="h4" component="h2" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography variant="body1">{section.description}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ImageWrapper>
                  <Image
                    src="https://images.pexels.com/photos/9756241/pexels-photo-9756241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Community discussion"
                    layout="responsive"
                    width={400}
                    height={225}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Bringing members of the community to discuss challenges that affect them and how to solve them.
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
              <Grid item xs={6}>
                <ImageWrapper>
                  <Image
                    src="https://images.pexels.com/photos/8475204/pexels-photo-8475204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Local business owner"
                    layout="responsive"
                    width={200}
                    height={150}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Providing a platform for local business owners to promote their services and products.
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
              <Grid item xs={6}>
                <ImageWrapper>
                  <Image
                    src="https://images.pexels.com/photos/6646855/pexels-photo-6646855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Community event"
                    layout="responsive"
                    width={200}
                    height={150}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Giving back to those who are in need.
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper elevation={3}>
              <Typography variant="h4" component="h2" gutterBottom color="primary">
                Our Impact
              </Typography>
              <Typography variant="body1" paragraph>
                Since our inception, Sisonke has made significant strides in empowering South African townships:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">Connected over 10,000 job seekers with local opportunities</Typography>
                </li>
                <li>
                  <Typography variant="body1">Facilitated the growth of 500+ small businesses</Typography>
                </li>
                <li>
                  <Typography variant="body1">Organized 200+ community events fostering unity and collaboration</Typography>
                </li>
                <li>
                  <Typography variant="body1">Provided a platform for 5,000+ community members to voice their concerns and ideas</Typography>
                </li>
              </ul>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Join us in our mission to create thriving, connected communities across South Africa.
              </Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
      <Subscribe />
      <Footer />
    </React.Fragment>
  );
}
