"use client";
import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";


const Footer = () => {
  const footerSections = [
    {
      title: "Navigation",
      links: [
        "About Us",
        "Careers",
        "Terms of Service",
        "Privacy Policy",
      ],
    },
    {
      title: "Help",
      links: ["Contact Us", "My Account", "Help Center", "FAQs"],
    },
    {
      title: "Community",
      links: ["Jobs", "Blog", "Forum", "Events"],
    },
  ];


  const bottomFooterStyles = {
    fontSize: "12px,",
    textDecoration: "none",
    color: "#000000"
  }


  return (
    <Box
      component="footer"
      sx={{ backgroundColor: "#ffffff", py: 6, flexGrow: 1 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {footerSections.map((section) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={section.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {section.title}
              </Typography>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {section.links.map((link) => (
                  <li style={{ marginBottom: "10px" }} key={link}>
                    <Link sx={{ textDecoration: "none" }} href="#" variant="body2" color="text.secondary">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Subscribe
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join our community to receive updates
            </Typography>
            <form style={{ display: "flex", gap: "10px", marginBottom: "10px" }} noValidate>
              <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #5d5bff",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  borderRadius: "10px",
                  backgroundColor: "#5d5bff",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Subscribe
              </button>
            </form>
            <Typography variant="caption" color="text.secondary">
              By subscribing, you agree to our Privacy Policy
            </Typography>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">
                SISONKE
              </Typography>
            </Grid>
            <Grid item>
              <Box display="flex" gap={2}>
                <FacebookIcon color="primary" />
                <InstagramIcon color="primary" />
                <LinkedInIcon color="primary" />
                <YouTubeIcon color="primary" />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Box display="flex" gap={2}>
                <Link href="#" sx={bottomFooterStyles} variant="body2">
                  Privacy Policy
                </Link>
                <Link href="#" sx={bottomFooterStyles} variant="body2">
                  Terms of Service
                </Link>
                <Link href="#" sx={bottomFooterStyles} variant="body2">
                  Cookie Policy
                </Link>
              </Box>
            </Grid>
            <Grid item>
              <Typography sx={bottomFooterStyles} variant="body2">
                © 2024 Mingers. All rights reserved
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};


export default Footer;
