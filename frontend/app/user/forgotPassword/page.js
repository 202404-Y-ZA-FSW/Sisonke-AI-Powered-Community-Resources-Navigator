"use client"
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/forgotpassword/forgot-password', {
        email,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setError('');
      }
    } catch (err) {
      setError('There was a problem sending the email.');
      setMessage('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please enter your email address to reset your password.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Reset Link
          </Button>
        </form>

        {message && (
          <Typography variant="body2" color="green" mt={2}>
            {message}
          </Typography>
        )}

        {error && (
          <Typography variant="body2" color="error" mt={2}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgotPassword;
