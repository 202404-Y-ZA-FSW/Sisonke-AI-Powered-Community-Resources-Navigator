import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h6" color="text.primary" gutterBottom>
                SIS<span style={{ color: '#6c63ff' }}>O</span>NKE
              </Typography>
            </Box>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              143 West Street, Sandown, Sandton, Gauteng, South Africa
            </Typography>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              info@sisonke.co.za
            </Typography>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              +27 12 345 6789
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "#6c63ff", border: "1px solid #6c63ff", marginRight: "10px" }} aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "#6c63ff", border: "1px solid #6c63ff", marginRight: "10px" }} aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: "#6c63ff", border: "1px solid #6c63ff", marginRight: "10px" }} aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "#6c63ff", border: "1px solid #6c63ff" }} aria-label="Facebook">
                <Facebook />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Community
            </Typography>
            {['Blog', 'Forum', 'Events', 'Education'].map((item) => (
              <Link href="#" sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block" key={item}>
                {item}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            {['Home', 'About Us', 'Careers', 'FAQs'].map((item) => (
              <Link href="#" sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block" key={item}>
                {item}
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Support
            </Typography>
            {['Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
              <Link href="#" sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block" key={item}>
                {item}
              </Link>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;