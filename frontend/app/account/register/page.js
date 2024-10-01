import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import sisonkeImage from "../register/sisonke.jpg";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Grid,
  Paper,
  Avatar,
  CircularProgress,
} from "@mui/material";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleUrl, setGoogleUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  useEffect(() => {
    fetch("/get-auth-urls")
      .then((response) => response.json())
      .then((data) => {
        setGoogleUrl(data.googleUrl);
        setFacebookUrl(data.facebookUrl);
      })
      .catch((error) => console.error(error));
  }, []);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!fullName || !username || !password || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (!validateEmail(username)) {
      setError("Invalid email address. Please use format: example@example.com");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    const userData = { fullName, username, password };

    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        alert("Registration successful!");
      })
      .catch((error) => {
        console.error(error);
        setError(`An error occurred during registration: ${error.message}`);
        setLoading(false);
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", p: 2 }}
      >
        <Typography variant="h6" fontWeight="bold">
          Local Resident
        </Typography>
        <Link
          href="/login" // Redirect to login page
          variant="body2"
          sx={{
            alignSelf: "center",
            fontWeight: "bold",
            color: "white", // Change color to white
            textDecoration: "none",
          }}
        >
          Existing user? Sign in.
        </Link>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundColor: "#D4A017",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          p: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold" color="black">
            Discover local resources and
          </Typography>
          <Typography variant="h5" color="black">
            Find the perfect match for your needs!
          </Typography>
          <img
            src={"https://www.omniaccounts.co.za/wp-content/uploads/2022/10/How-to-register-a-new-small-business-in-south-africa.jpeg"}
            alt="sisonke"
            style={{
              width: "80%",
              maxWidth: "300px",
              margin: "16px 0",
            }}
          />
          <Typography variant="body1" sx={{ mt: 4, color: "black" }}>
            Explore local opportunities with ease!
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "orange" }} />
          <Typography component="h1" variant="h5">
            Join SisonkeConnect
          </Typography>
          <Typography component="p" sx={{ color: "gray", mt: 1 }}>
            Unlock exclusive features, no commitment required
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Your Full Name"
              name="fullName"
              autoComplete="name"
              autoFocus
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Create a Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{ sx: { borderRadius: "50px" } }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            {loading ? (
              <CircularProgress sx={{ mt: 3, mb: 2 }} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#D4A017",
                  color: "black",
                  borderRadius: "50px",
                  "&:hover": { backgroundColor: "#D4A017" },
                }}
              >
                Sign Up
              </Button>
            )}
            <Typography align="center" variant="body2">
              or connect with
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <Grid item>
                <Button
                  startIcon={<GoogleIcon />}
                  variant="contained"
                  onClick={() => (window.location.href = googleUrl)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "50px",
                    backgroundColor: "#DB4437",
                    color: "white",
                    "&:hover": { backgroundColor: "#C53929" },
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<FacebookIcon />}
                  variant="contained"
                  onClick={() => (window.location.href = facebookUrl)}
                  sx={{
                    textTransform: "none",
                    borderRadius: "50px",
                    backgroundColor: "#4267B2",
                    color: "white",
                    "&:hover": { backgroundColor: "#365e8d" },
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Signup;
