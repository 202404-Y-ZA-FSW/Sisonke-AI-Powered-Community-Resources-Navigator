"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useAuthentication } from "../../hooks/useAuthentication";

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
      const response = await axios.post(
        "http://localhost:5000/account/login",
        formData
      );
      const { token, ...user } = response.data;

      await login(token, user);
      
      if (user.user.role === "administrator") {
        router.push("/dashboard");
      } else if (user.user.role === "ngo") {
        router.push("/ngo/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response.data.message || "An error occurred during login."
        );
      } else if (error.request) {
        setError("No response received from the server.");
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
              Login
            </Typography>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: "16px" }}>
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
                disabled={loading}
                InputProps={{
                  sx: { borderRadius: "16px" },
                }}
              />
              <Button
                fullWidth
                sx={{
                  mb: 2,
                  textTransform: "none",
                  color: "#ffffff",
                  backgroundColor: "#6c63ff",
                  borderRadius: "16px",
                  "&:hover": { backgroundColor: "#5A52D5" },
                }}
                type="submit"
                disabled={loading}
              >
                {loading ? "Working" : "Login"}
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
      </Box>
    </ThemeProvider>
  );
}
