
import { Box, Typography } from '@mui/material';

const Hero = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        textAlign: 'center',
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        padding: '2rem',
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0a0a23' }}>
        Get in touch with us for more information
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '1rem', color: '#0a0a23' }}>
        If you need help or have a question, we’re here for you
      </Typography>
    </Box>
  );
};

export default Hero;
