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
  Paper,
  Avatar,
  Snackbar,
  Container,
  Alert,
} from "@mui/material";

function Register() {
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
        // Reset form or redirect user
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
    <Box>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: 3,
          }}
        ></Grid>

        {/* Right Section (Form) */}
        <Grid item xs={12} sm={8} md={5} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Create A Sisonke Account
            </Typography>
            <Typography component="p" sx={{ color: "gray", mt: 1, textAlign: "center" }}>
              Join Sisonke and discover amazing opportunities, community support and empowerment, employment opportunities, and more.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 2, boxShadow: "none" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                InputProps={{ sx: { borderRadius: "16px" } }}
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{ sx: { borderRadius: "16px" } }}
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                InputProps={{ sx: { borderRadius: "16px" } }}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                InputProps={{ sx: { borderRadius: "16px" } }}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
              />
              {/* Already have an account? */}
              <Link href="/account/login" variant="body2" sx={{ mt: "16px", color: "#111111", textDecoration: "none" }}>
                Already have an account? <span style={{ color: "#6c63ff" }}>Login</span>
              </Link>
              <Button
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#6c63ff",
                  color: "#ffffff",
                  borderRadius: "16px",
                  padding: "10px 20px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#5A52D5" },
                }}
              >
                Register
              </Button>
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
                  padding: "10px 20px",
                  textTransform: "none",
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
                  padding: "10px 20px",
                  textTransform: "none",
                  color: "white",
                  "&:hover": { backgroundColor: "#C53929" },
                }}
              >
                Continue with Google
              </Button>
            </Box>
          </Box>
        </Grid>
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
      </Grid>
    </Box>
  );
}

export default Register;
