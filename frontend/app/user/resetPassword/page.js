"use client"
import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

const ResetPassword = () => {
  const [isMounted, setIsMounted] = useState(false); // New state to check if mounted
  const router = useRouter();
  const { token } = router.query;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Set mounted to true when component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/forgotpassword/reset-password', {
        token,  // token is passed from the query string
        password,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setError('');
      }
    } catch (err) {
      setError('Failed to reset the password. Please try again.');
      setMessage('');
    }
  };

  if (!isMounted) {
    return null; // Ensure we don't render anything during SSR
  }

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
          Reset Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please enter a new password.
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="New Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Reset Password
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

export default ResetPassword;
