"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
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
  Alert,
} from "@mui/material";
import axios from "axios";
import { useAuthentication } from '../../hooks/useAuthentication'; // Adjust the import path as needed

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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuthentication();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/account/login", formData);
      const { token, ...user } = response.data;
      
      await login(token, user);
      console.log(user);
      console.log(token);
      if (user.role === "administrator") {
        router.push("/dashboard");
      } else if (user.role === "ngo") {
        router.push("/ngo/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "An error occurred during login.");
      } else if (error.request) {
        setError("No response received from the server. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Error logging in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Card sx={{ width: 350, boxShadow: "0 2px 4px rgba(0,0,0,.1)" }}>
          <CardContent sx={{ padding: "24px" }}>
            <Typography
              variant="h5"
              component="h1"
              sx={{ mb: 3, fontWeight: "bold" }}
            >
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                placeholder="Username"
                variant="outlined"
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
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
                disabled={loading}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Link
                href="#"
                underline="none"
                sx={{ color: "#f9a825", fontSize: "0.875rem" }}
              >
                Forgot password?
              </Link>
              <Link
                href="/account/register"
                underline="none"
                sx={{ color: "#f9a825", fontSize: "0.875rem" }}
              >
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
              sx={{
                backgroundColor: "#DB4437",
                color: "white",
                "&:hover": { backgroundColor: "#C53929" },
              }}
            >
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}