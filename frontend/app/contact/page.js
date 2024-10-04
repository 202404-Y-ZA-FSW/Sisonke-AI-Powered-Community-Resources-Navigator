"use client";

import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper, IconButton } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter, Phone, Email, LocationOn } from '@mui/icons-material';
import Footer from '../components/sections/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    message: '',
  });

  const validateEmail = (email) => {
    //  check if email contains @
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
    if (name === 'email' && errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
    if (name === 'message' && errors.message) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    let hasError = false;
    const newErrors = { email: '', message: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      hasError = true;
    }

    if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    
    try {
      const res = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert('Message sent successfully');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        alert('Failed to send message');
      }
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  return (
   <> 
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
      }}
    >
      <Box sx={{ maxWidth: '1200px', width: '100%' }}>
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', boxShadow: 'none' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', marginBottom: '30px' }}>
            Send Your Message
          </Typography>

          <Grid container spacing={4}>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                backgroundColor: '#7033F7', 
                padding: '30px', 
                borderRadius: '10px', 
                color: 'white', 
                position: 'relative', 
                overflow: 'hidden',
              }}>
                <Box sx={{ 
                  position: 'absolute', 
                  width: '100px', 
                  height: '100px', 
                  backgroundColor: '#f5a623', 
                  borderRadius: '50%', 
                  bottom: '-20px', 
                  right: '-20px' 
                }} />
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '20px' }}>
                  Contact Information
                </Typography>
                <Typography sx={{ marginBottom: '10px' }}>Fill out the form and our team will get back to you within 24 hours.</Typography>
                
                <Box display="flex" alignItems="center" sx={{ marginBottom: '10px' }}>
                  <Phone sx={{ marginRight: '10px', color: 'white' }} />
                  <Typography sx={{ fontWeight: 'bold' }}>+27 83 885 5555</Typography>
                </Box>

                <Box display="flex" alignItems="center" sx={{ marginBottom: '10px' }}>
                  <Email sx={{ marginRight: '10px', color: 'white' }} />
                  <Typography sx={{ fontWeight: 'bold' }}>Sisonke@gmail.com</Typography>
                </Box>

                <Box display="flex" alignItems="center">
                  <LocationOn sx={{ marginRight: '10px', color: 'white' }} />
                  <Typography sx={{ fontWeight: 'bold' }}>138 West Street, Sandton, Johannesburg</Typography>
                </Box>

                {/* social media icons */}
                <Box display="flex" justifyContent="flex-start" marginTop={3}>
                  <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white' }}>
                    <Facebook />
                  </IconButton>
                  <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white' }}>
                    <Instagram />
                  </IconButton>
                  <IconButton href="https://linkedin.com" target="_blank" sx={{ color: 'white' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton href="https://twitter.com" target="_blank" sx={{ color: 'white' }}>
                    <Twitter />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            {/* form */}
            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      fullWidth
                      required
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit" 
                    sx={{ 
                      padding: '10px 30px', 
                      fontWeight: 'bold', 
                      backgroundColor: '#f5a623', 
                      '&:hover': { backgroundColor: '#d48817' } 
                    }}>
                    Send Message
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
    <Footer/>
   </> 

  );
}
