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
                <figure> {/* Add a <figure> element to wrap the image and caption */}
                  <Image
                    src="https://images.pexels.com/photos/9756241/pexels-photo-9756241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    height={150}
                    width={400}
                    layout="responsive"
                    objectFit="contain"
                  />
                  <figcaption>Bringing members of the community to discuss challenges that affect them and how to solve them.</figcaption> {/* Add the caption */}
                </figure>
              </Grid>
              <Grid item xs={6}>
                <figure>
                  <Image
                    src="https://images.pexels.com/photos/8475204/pexels-photo-8475204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Local business owner"
                    height={150}
                    width={200}
                    layout="responsive"
                    objectFit="contain"
                  />
                  <figcaption>Providing a platform for local business owners to promote their services and products.</figcaption>
                </figure>
              </Grid>
              <Grid item xs={6}>
                <figure>
                  <Image
                    src="https://images.pexels.com/photos/6646855/pexels-photo-6646855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Community event"
                    height={150}
                    width={200}
                    layout="responsive"
                    objectFit="contain"
                  />
                  <figcaption>Giving back to those who are in need.</figcaption>
                </figure>
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
