"use client";

import React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"; // Updated import
import Image from "next/image";
import Hero from "./hero";
import Footer from "../components/sections/Footer";
import Subscribe from "../components/sections/Subscribe";
import Navigation from "../components/sections/Navigation";

const StyledCard = styled(Card)(({ theme }) => {
  const defaultTheme = useTheme(); // Use the default theme
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
        : "0px 4px 6px rgba(0, 0, 0, 0.1)", // Safe fallback
    },
  };
});

const NumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#6c63ff",
  marginBottom: theme.spacing(2),
}));

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
      <Navigation/>
      <Hero />
      <Container
        maxWidth="lg"
        sx={{ mt: 15, mb: 15 }}
      >
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
      <Subscribe/>
      <Footer />
    </React.Fragment>
  );
}
