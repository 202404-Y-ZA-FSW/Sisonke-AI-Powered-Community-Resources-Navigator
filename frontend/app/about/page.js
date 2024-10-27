"use client";

import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Hero from "./hero";
import Footer from "../components/sections/Footer";
import Subscribe from "../components/sections/Subscribe";
import Navigation from "../components/sections/Navigation";
import { motion } from "framer-motion";

// Styled components
const StyledCard = styled(motion.div)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "24px",
  boxShadow: "0 8px 32px rgba(108, 99, 255, 0.1)",
  background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
  perspective: "1000px",
  transformStyle: "preserve-3d",
}));

const NumberTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#6c63ff",
  marginBottom: theme.spacing(2),
  textShadow: "2px 2px 4px rgba(108, 99, 255, 0.2)",
}));

const ImageWrapper = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  perspective: "1000px",
  transformStyle: "preserve-3d",
}));

const ImageCaption = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  background: 'linear-gradient(to top, rgba(108, 99, 255, 0.9), rgba(108, 99, 255, 0))',
  color: '#fff',
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: 'bold',
}));

const StyledPaper = styled(motion.div)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fff5e6 0%, #e6f7ff 100%)',
  borderRadius: '24px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  perspective: "1000px",
  transformStyle: "preserve-3d",
}));

// Main component
export default function AboutUs() {
  const sections = [
    {
      number: "01",
      title: "Who We Are",
      description:
        "Sisonke is a community-driven platform connecting local resources, opportunities, and people in South African townships.",
    },
    {
      number: "02",
      title: "What We Do",
      description:
        "We provide a digital hub for job listings, events, forums, and local business promotion to empower our community.",
    },
    {
      number: "03",
      title: "How We Help",
      description:
        "Through our platform, we facilitate connections, share knowledge, and create opportunities for growth and development.",
    },
    {
      number: "04",
      title: "Create Success Stories",
      description:
        "By bringing together community members, businesses, and resources, we help individuals achieve their goals and thrive.",
    },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const elements = containerRef.current.querySelectorAll('.animate-3d');
      elements.forEach((el) => {
        el.style.transform = `
          perspective(1000px)
          rotateY(${x * 15}deg)
          rotateX(${-y * 15}deg)
          translateZ(30px)
        `;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <React.Fragment>
      <Navigation />
      <Hero />
      <Container maxWidth="lg" sx={{ mt: 20, mb: 20 }} ref={containerRef}>
        <Grid container spacing={6}>
          {sections.map((section) => (
            <Grid item xs={12} md={6} key={section.title}>
              <StyledCard className="animate-3d" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <CardContent>
                  <NumberTypography>{section.number}</NumberTypography>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#555' }}>{section.description}</Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ImageWrapper className="animate-3d" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src="https://images.pexels.com/photos/9756241/pexels-photo-9756241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Community discussion"
                    layout="responsive"
                    width={400}
                    height={225}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Bringing members of the community together to discuss challenges and solutions
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
              <Grid item xs={6}>
                <ImageWrapper className="animate-3d" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src="https://images.pexels.com/photos/8475204/pexels-photo-8475204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Local business owner"
                    layout="responsive"
                    width={200}
                    height={150}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Empowering local business owners
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
              <Grid item xs={6}>
                <ImageWrapper className="animate-3d" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image
                    src="https://images.pexels.com/photos/6646855/pexels-photo-6646855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Community event"
                    layout="responsive"
                    width={200}
                    height={150}
                    objectFit="cover"
                  />
                  <ImageCaption>
                    Supporting those in need
                  </ImageCaption>
                </ImageWrapper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper className="animate-3d" whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Typography variant="h4" component="h2" gutterBottom color="primary" sx={{ fontWeight: 'bold' }}>
                Our Impact
              </Typography>
              <Divider sx={{ my: 2, backgroundColor: '#6c63ff' }} />
              <Typography variant="body1" paragraph sx={{ color: '#555' }}>
                Since our inception, Sisonke has made significant strides in empowering South African townships:
              </Typography>
              <Box component="ul" sx={{ pl: 3, '& li': { mb: 2 } }}>
                <li>
                  <Typography variant="body1" sx={{ color: '#555' }}>Connected over <Box component="span" sx={{ color: '#6c63ff', fontWeight: 'bold' }}>10,000</Box> job seekers with local opportunities</Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ color: '#555' }}>Facilitated the growth of <Box component="span" sx={{ color: '#6c63ff', fontWeight: 'bold' }}>500+</Box> small businesses</Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ color: '#555' }}>Organized <Box component="span" sx={{ color: '#6c63ff', fontWeight: 'bold' }}>200+</Box> community events fostering unity and collaboration</Typography>
                </li>
                <li>
                  <Typography variant="body1" sx={{ color: '#555' }}>Provided a platform for <Box component="span" sx={{ color: '#6c63ff', fontWeight: 'bold' }}>5,000+</Box> community members to voice their concerns and ideas</Typography>
                </li>
              </Box>
              <Typography variant="body1" sx={{ mt: 3, fontStyle: 'italic', color: '#6c63ff' }}>
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