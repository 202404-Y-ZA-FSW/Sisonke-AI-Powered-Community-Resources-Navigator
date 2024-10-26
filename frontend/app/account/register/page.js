"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
  Container,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Facebook, Google } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6c63ff",
    },
    secondary: {
      main: "#4267B2",
    },
    background: {
      default: "#f4f6f8",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 700,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "24px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "12px",
          padding: "14px 0",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        },
      },
    },
  },
});

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/account/register",
          formData
        );
        setSnackbar({
          open: true,
          message: "Registration successful!",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.response?.data?.message || "Registration failed",
          severity: "error",
        });
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
          padding: isMobile ? theme.spacing(2) : theme.spacing(4),
        }}
      >
        <Container maxWidth="sm" disableGutters={isMobile}>
          <Card sx={{ width: '100%' }}>
            <CardContent sx={{ padding: isMobile ? "24px" : "48px" }}>
              <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                sx={{ mb: 3, textAlign: "center" }}
              >
                Join Sisonke
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}>
                Discover opportunities, connect with the community, and grow together.
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Username"
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username}
                />
                <TextField
                  fullWidth
                  placeholder="Email"
                  variant="outlined"
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Password"
                  variant="outlined"
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  fullWidth
                  type="password"
                  placeholder="Confirm Password"
                  variant="outlined"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ mt: 2, mb: 3 }}
                >
                  Create Account
                </Button>
              </form>
              <Divider sx={{ my: 3 }}>OR</Divider>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={<Facebook />}
                size="large"
                sx={{ mb: 2 }}
              >
                Continue with Facebook
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                size="large"
                sx={{
                  borderColor: "#DB4437",
                  color: "#DB4437",
                  "&:hover": { backgroundColor: "rgba(219, 68, 55, 0.04)" },
                }}
              >
                Continue with Google
              </Button>
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Link
                  href="/account/login"
                  sx={{ color: "primary.main", textDecoration: "none" }}
                >
                  Already have an account? Log in
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Container>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
