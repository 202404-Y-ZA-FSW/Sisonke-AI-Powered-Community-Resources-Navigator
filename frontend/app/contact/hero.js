import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();

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
        {t('Hero.GetInTouch')}
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '1rem', color: '#0a0a23' }}>
        {t('Hero.HelpMessage')}
      </Typography>
    </Box>
  );
};

export default Hero;
