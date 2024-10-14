"use client";
import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Card,
  CardContent,
  ThemeProvider,
  createTheme,
  Alert,
  Snackbar,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f9a825",
    },
    secondary: {
      main: "#4267B2",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "25px",
          padding: "10px 0",
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
        }}
      >
        <Card sx={{ width: 450, borderRadius: "16px", boxShadow: 3 }}>
          <CardContent sx={{ padding: "24px" }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ mb: 3, fontWeight: "bold" }}
            >
              Create A Sisonke Account
            </Typography>
            <Typography component="p" sx={{ color: "gray", mt: 1, textAlign: "center" }}>
              Join Sisonke and discover amazing opportunities, community support, and more.
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
                InputProps={{
                  sx: { borderRadius: "16px" },
                }}
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
                InputProps={{
                  sx: { borderRadius: "16px" },
                }}
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
                InputProps={{
                  sx: { borderRadius: "16px" },
                }}
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
                InputProps={{
                  sx: { borderRadius: "16px" },
                }}
              />
              <Link
                href="/account/login"
                sx={{ display: "block", color: "#6c63ff", mt: "16px", textDecoration: "none" }}
              >
                Already have an account? Login
              </Link>
              <Button
                fullWidth
                type="submit"
                sx={{
                  mt: 3,
                  mb: 2,
                  textTransform: "none",
                  color: "#ffffff",
                  backgroundColor: "#6c63ff",
                  borderRadius: "16px",
                  "&:hover": { backgroundColor: "#5A52D5" },
                }}
              >
                Register
              </Button>
            </form>
            <Typography align="center" sx={{ mb: 2 }}>
              OR
            </Typography>
            <Button
              fullWidth
              color="secondary"
              sx={{
                mb: 2,
                backgroundColor: "#1877F2",
                color: "white",
                borderRadius: "16px",
                "&:hover": { backgroundColor: "#5A52D5" },
              }}
            >
              Continue with Facebook
            </Button>
            <Button
              fullWidth
              sx={{
                borderRadius: "16px",
                backgroundColor: "#DB4437",
                color: "white",
                "&:hover": { backgroundColor: "#C53929" },
              }}
            >
              Continue with Google
            </Button>
          </CardContent>
        </Card>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            sx={{ width: "100%", borderRadius: "16px" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}
