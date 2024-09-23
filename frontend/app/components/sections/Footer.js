import React from 'react';
import { Box, Container, Grid, Typography, TextField, Button, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              <Box component="span" sx={{ color: 'primary.main' }}>C</Box>
              AREE
              <Box component="span" sx={{ color: 'warning.main' }}>R</Box>
            </Typography>
            <Box component="form" noValidate sx={{ mt: 2 }}>
              <TextField
                fullWidth
                placeholder="Email address"
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
              >
                Subscribe
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Email us
            </Typography>
            <Typography variant="body1" gutterBottom>
              email@gmail.com
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Call us
            </Typography>
            <Typography variant="body1" gutterBottom>
              000 1234 5678
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Link href="#" color="primary" sx={{ mr: 2 }}>
                <FacebookIcon />
              </Link>
              <Link href="#" color="primary" sx={{ mr: 2 }}>
                <LinkedInIcon />
              </Link>
              <Link href="#" color="primary" sx={{ mr: 2 }}>
                <TwitterIcon />
              </Link>
              <Link href="#" color="primary">
                <InstagramIcon />
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Career
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
              {['About us', 'Why Career', 'Testimonials', 'Promotions', 'Blog', 'Podcasts', 'Forum'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Help
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
              {['Contact us', 'My account'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Jobs
            </Typography>
            <Box component="ul" sx={{ p: 0, listStyle: 'none' }}>
              {['Design Industry', 'Development Industry', 'Marketing Industry', 'Other Industry'].map((item) => (
                <Box component="li" key={item} sx={{ mb: 1 }}>
                  <Link href="#" color="inherit" underline="hover">
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5, pt: 3, borderTop: 1, borderColor: 'divider' }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                Copyright © 2022 UIHUT all rights reserved.
              </Typography>
            </Grid>
            <Grid item>
              <Link href="#" color="inherit" underline="hover" sx={{ mr: 2 }}>
                Terms of Service
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;