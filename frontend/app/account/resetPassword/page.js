'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  CardHeader, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  AlertTitle 
} from '@mui/material';
import axios from 'axios';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
  
      setLoading(true);
      const response = await axios.put(`http://localhost:5000/forgotpassword/reset-password/${token}`, {
        password,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        setError('');
      }
    } catch (err) {
      setError('Failed to reset the password. Please try again.');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh', 
        bgcolor: 'grey.100' 
      }}
    >
      <Card sx={{ maxWidth: 500, width: '100%', p: 2 }}>
        <CardHeader title="Reset Password" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Please enter a new password.
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField 
              label="New Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <TextField 
              label="Confirm New Password" 
              type="password" 
              fullWidth 
              margin="normal" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </form>
        </CardContent>
        <CardActions>
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleSubmit} 
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </CardActions>
        {message && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <AlertTitle>Success</AlertTitle>
            {message}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        )}
      </Card>
    </Box>
  );
}