"use client"
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Card, 
  CardContent,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f9a825', 
    },
    secondary: {
      main: '#4267B2', 
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '25px',
          padding: '10px 0',
        },
      },
    },
  },
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // login logic to be added
    console.log('Login attempt with:', email, password);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f2f5',
        }}
      >
        <Card sx={{ width: 350, boxShadow: '0 2px 4px rgba(0,0,0,.1)' }}>
          <CardContent sx={{ padding: '24px' }}>
            <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                placeholder="you@example.com"
                variant="outlined"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                placeholder="Password"
                variant="outlined"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                type="submit"
              >
                Login
              </Button>
            </form>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Link href="#" underline="none" sx={{ color: '#f9a825', fontSize: '0.875rem' }}>
                Forgot password?
              </Link>
              <Link href="#" underline="none" sx={{ color: '#f9a825', fontSize: '0.875rem' }}>
                Register
              </Link>
            </Box>
            <Typography align="center" sx={{ mb: 2 }}>
              or
            </Typography>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ mb: 2 }}
            >
              Continue with Facebook
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#DB4437', color: 'white', '&:hover': { backgroundColor: '#C53929' } }}
            >
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}