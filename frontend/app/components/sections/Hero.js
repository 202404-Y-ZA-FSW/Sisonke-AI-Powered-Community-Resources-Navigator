"use client";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import ForumIcon from '@mui/icons-material/Forum';
import HeroImage from "./Images/hero-image.jpg";
import CityOfJHB from "./Images/logos/jhb.png";
import CityOfEkurhuleni from "./Images/logos/ekurhuleni.png";
import CityOfTshwane from "./Images/logos/tshwane.png";
import NYDA from "./Images/logos/nyda.png";
import SA from "./Images/logos/sayouth.png";
import Projecty from "./Images/logos/projecty.svg";
import NotionLogo from "./Images/logos/Notion.png";
import GoogleLogo from "./Images/logos/google.png";
import SlackLogo from "./Images/logos/slack.png";
import { useTranslation } from 'react-i18next';

const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)',
  minHeight: '100vh',
  padding: '2rem',
});

const RoundedImage = styled(Image)({
  borderRadius: '20px',
});

const ExploreButton = styled(Button)({
  borderRadius: '10px',
  textTransform: 'none',
  padding: '0.5rem 2rem',
  backgroundColor: '#6c63ff',
  color: 'white',
  '&:hover': {
    backgroundColor: '#4e42c2',
  },
});

const StatsContainer = styled(Grid)(({ theme }) => ({
  textAlign: 'center',
  marginTop: '2rem',
  marginLeft: '-8%',
  [theme.breakpoints.down('md')]: {
    marginLeft: '0',
  },
}));

const StatBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.3rem',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StatIcon = styled(Box)({
  backgroundColor: "#6c63ff",
  color: "#ffffff",
  padding: "12px",
  borderRadius: '50%',
  marginBottom: '10px',
  transition: 'background-color 0.3s',
  "&:hover": {
    backgroundColor: "#5A52D5",
  },
});

const AnimatedNumber = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
  fontSize: '1.2rem',
  animation: 'fade-in 0.5s ease-in-out',
  '@keyframes fade-in': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
});

export default function HeroSection() {
  const { t } = useTranslation();
  const [jobCount, setJobCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [forumCount, setForumCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/stats/counts');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);
        setJobCount(data.jobCount);
        setBusinessCount(data.businessCount);
        setUserCount(data.userCount);
        setForumCount(data.forumCount);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                color: '#333',
                marginTop: '3rem'
              }}
            >
              {t('HeroSection.Title')}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mb: 4 }}>
              {t('HeroSection.Subtitle')}
            </Typography>
            <StatsContainer container spacing={2} justifyContent="center">
              <Grid item xs={6} md={3}>
                <StatBox>
                  <StatIcon>
                    <GroupIcon style={{ fontSize: 28 }} />
                  </StatIcon>
                  <AnimatedNumber variant="h6">
                    {userCount}
                  </AnimatedNumber>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {t('HeroSection.Users')}
                  </Typography>
                </StatBox>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatBox>
                  <StatIcon>
                    <SchoolIcon style={{ fontSize: 28 }} />
                  </StatIcon>
                  <AnimatedNumber variant="h6">
                    {jobCount}
                  </AnimatedNumber>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {t('HeroSection.JobsCreated')}
                  </Typography>
                </StatBox>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatBox>
                  <StatIcon>
                    <BusinessCenterIcon style={{ fontSize: 28 }} />
                  </StatIcon>
                  <AnimatedNumber variant="h6">
                    {businessCount}
                  </AnimatedNumber>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {t('HeroSection.Businesses')}
                  </Typography>
                </StatBox>
              </Grid>
              <Grid item xs={6} md={3}>
                <StatBox>
                  <StatIcon>
                    <ForumIcon style={{ fontSize: 28 }} />
                  </StatIcon>
                  <AnimatedNumber variant="h6">
                    {forumCount}
                  </AnimatedNumber>
                  <Typography variant="body2" sx={{ color: '#666', fontSize: '0.85rem' }}>
                    {t('HeroSection.Forums')}
                  </Typography>
                </StatBox>
              </Grid>
            </StatsContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: '400px', width: '100%' }}>
              <RoundedImage
                src={HeroImage}
                alt="Professional with laptop"
                layout="fill"
                objectFit="cover"
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  padding: '0.5rem',
                }}
              >
                <Image src={NotionLogo} alt="Notion logo" width="100%" height={40} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  padding: '0.5rem',
                }}
              >
                <Image src={GoogleLogo} alt="Google logo" width="100%" height={40} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  backgroundColor: 'transparent',
                  borderRadius: '50%',
                  padding: '0.5rem',
                }}
              >
                <Image src={SlackLogo} alt="Slack logo" width="100%" height={40} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            {t('HeroSection.SupportedBy')}
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mb: 4 }}>
            {t('HeroSection.SupportSubtitle')}
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            <Grid item>
              <Image src={CityOfJHB} alt="City Of Johannesburg" width="100%" height={50} />
            </Grid>
            <Grid item>
              <Image src={CityOfEkurhuleni} alt="City Of Ekurhuleni" width="100%" height={50} />
            </Grid>
            <Grid item>
              <Image src={CityOfTshwane} alt="City Of Tshwane" width="100%" height={50} />
            </Grid>
            <Grid item>
              <Image src={NYDA} alt="NYDA" width="100%" height={50} />
            </Grid>
            <Grid item>
              <Image src={SA} alt="SA Youth" width="100%" height={50} />
            </Grid>
            <Grid item>
              <Image src={Projecty} alt="Projecty" width="100%" height={50} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </GradientBackground>
  );
}
