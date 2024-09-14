import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { Google, Facebook } from '@mui/icons-material';

export default function SignupPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Left side: Image and text */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <Box
            component="img"
            src="/local-resources-image.png" // You'll need to host this image in the public folder.
            alt="Local resources"
            sx={{ maxWidth: '100%' }}
          />
          <Typography variant="h4" gutterBottom>
            Discover local resources and
          </Typography>
          <Typography variant="body1">
            Find the perfect match for your needs! Explore local opportunities with ease!
          </Typography>
        </Grid>

        {/* Right side: Signup form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
            }}
          >
            <Typography variant="h5" gutterBottom>
              Join SisonkeConnect
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Unlock exclusive features. No commitment required.
            </Typography>

            <form>
              <TextField
                fullWidth
                label="Your full name"
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Your unique username"
                margin="normal"
                variant="outlined"
                required
              />
              <TextField
                fullWidth
                label="Create a password"
                margin="normal"
                variant="outlined"
                type="password"
                required
              />
              <TextField
                fullWidth
                label="Confirm password"
                margin="normal"
                variant="outlined"
                type="password"
                required
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2, py: 1.5 }}
              >
                Sign up
              </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              or connect with
            </Typography>

            <Box display="flex" justifyContent="center" sx={{ mt: 1 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Google />}
                sx={{ mx: 1 }}
              >
                Google
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<Facebook />}
                sx={{ mx: 1 }}
              >
                Facebook
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
