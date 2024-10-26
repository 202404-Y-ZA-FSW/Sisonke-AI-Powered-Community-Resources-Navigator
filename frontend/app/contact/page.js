"use client";

import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Paper, IconButton, Container } from '@mui/material';
import { Facebook, Instagram, LinkedIn, Twitter, Phone, Email, LocationOn } from '@mui/icons-material';
import Footer from '../components/sections/Footer';
import Navbar from '../components/sections/NavBar'; 
import Subscription from '../components/sections/Subscribe'; 
import Hero from './hero';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '24px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
}));

const ContactInfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#7033F7',
  padding: theme.spacing(4),
  borderRadius: '16px',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 10px 20px rgba(112, 51, 247, 0.3)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    '& fieldset': {
      borderColor: '#7033F7',
    },
    '&:hover fieldset': {
      borderColor: '#5827c4',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#5827c4',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  padding: '0.5rem 2rem',
  backgroundColor: '#6c63ff',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4e42c2',
  },
}));

export default function ContactPage() {
  const { t } = useTranslation();
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

    let hasError = false;
    const newErrors = { email: '', message: '' };

    if (!validateEmail(formData.email)) {
      newErrors.email = t('ContactPage.InvalidEmail');
      hasError = true;
    }

    if (formData.message.length < 10) {
      newErrors.message = t('ContactPage.ShortMessage');
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
        alert(t('ContactPage.SuccessMessage'));
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        alert(t('ContactPage.FailureMessage'));
      }
    } catch (err) {
      console.error('Error submitting form', err);
    }
  };

  return (
    <>
      <Navbar /> 
      <Hero/>
      
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={5}>
              <ContactInfoBox>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
                  {t('ContactPage.ContactInformation')}
                </Typography>
                <Typography sx={{ mb: 3 }}>
                  {t('ContactPage.FormInstruction')}
                </Typography>

                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <Phone sx={{ mr: 2 }} />
                  <Typography sx={{ fontWeight: 'bold' }}>+27 12 345 6789</Typography>
                </Box>

                <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
                  <Email sx={{ mr: 2 }} />
                  <Typography sx={{ fontWeight: 'bold' }}>info@sisonke.co.za</Typography>
                </Box>

                <Box display="flex" alignItems="flex-start" sx={{ mb: 3 }}>
                  <LocationOn sx={{ mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      143 West Street, Sandown, Sandton
                    </Typography>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Gauteng, South Africa
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="flex-start" mt={4}>
                  {[Facebook, Instagram, LinkedIn, Twitter].map((Icon, index) => (
                    <IconButton key={index} sx={{ color: 'white', mr: 1 }}>
                      <Icon />
                    </IconButton>
                  ))}
                </Box>
              </ContactInfoBox>
            </Grid>

            <Grid item xs={12} md={7}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      label={t('ContactPage.Name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      label={t('ContactPage.Email')}
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
                    <StyledTextField
                      label={t('ContactPage.Subject')}
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      fullWidth
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      label={t('ContactPage.Message')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      fullWidth
                      required
                      multiline
                      rows={4}
                      variant="outlined"
                      error={!!errors.message}
                      helperText={errors.message}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="flex-end" mt={4}>
                  <StyledButton type="submit">
                    {t('ContactPage.SendMessage')}
                  </StyledButton>
                </Box>
              </form>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>

      <Subscription />
      <Footer /> 
    </>
  );
}
