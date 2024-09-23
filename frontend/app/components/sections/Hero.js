"use client";
import React from 'react';
import { Box, Typography, TextField, Button, Container, Grid, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import Image from 'next/image';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import HeroImage from "./Images/hero-image.jpg";

import CityOfJHB from "./Images/logos/jhb.png";
import CityOfEkurhuleni from "./Images/logos/ekurhuleni.png";
import CityOfTshwane from "./Images/logos/tshwane.png";
import NYDA from "./Images/logos/nyda.png";
import SA from "./Images/logos/sayouth.png";
import Projecty from "./Images/logos/projecty.svg";


import { Google } from '@mui/icons-material';
const GradientBackground = styled(Box)({
  background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)',
  minHeight: '100vh',
  padding: '2rem',
});

const RoundedImage = styled(Image)({
  borderRadius: '20px',
});

const CategoryButton = styled(Button)({
  borderRadius: '20px',
  textTransform: 'none',
  marginRight: '0.5rem',
  marginBottom: '0.5rem',
  padding: '0.25rem 1rem',
  backgroundColor: '#f0f0f0',
  color: '#333',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
});

const SearchBar = styled(Box)({
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: '10px',
  overflow: 'hidden',
});

const ExploreButton = styled(Button)({
  borderRadius: '10px',
  textTransform: 'none',
  padding: '0.5rem 2rem',
  backgroundColor: '#6c63ff',
  color: 'white',
  '&:hover': {
    backgroundColor: '#5a52d5',
  },
});

export default function HeroSection() {
  return (
    <GradientBackground>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
              Get most exciting job from all around the world here
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mb: 4 }}>
              Work with the largest network of independent professionals and get things done-from quick turnarounds to big transformations.
            </Typography>
            <SearchBar sx={{ mb: 4 }}>
              <TextField
                placeholder="Job Type"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <WorkOutlineIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& fieldset': { border: 'none' } }}
              />
              <TextField
                placeholder="Location"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{ '& fieldset': { border: 'none' } }}
              />
              <ExploreButton variant="contained" disableElevation>
                Search
              </ExploreButton>
            </SearchBar>
            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ color: '#666', mb: 1 }}>
                Popular Categories:
              </Typography>
              <CategoryButton variant="contained" disableElevation>
                UX Designer
              </CategoryButton>
              <CategoryButton variant="contained" disableElevation>
                Front-end Dev
              </CategoryButton>
              <CategoryButton variant="contained" disableElevation>
                Back-end Dev
              </CategoryButton>
            </Box>
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
                <Google fontSize="large" />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '0.5rem',
                }}
              >
                <Image src="/placeholder.svg?height=40&width=40" alt="Google logo" width={40} height={40} />
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  left: 10,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  padding: '0.5rem',
                }}
              >
                <Image src="/placeholder.svg?height=40&width=40" alt="Slack logo" width={40} height={40} />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
            We are supported
          </Typography>
          <Typography variant="subtitle1" gutterBottom sx={{ color: '#666', mb: 4 }}>
            By local governments, national youth agencies, and the private sector.
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
                <Image src={NYDA} alt="National Youth Development" width="100%" height={50} />
              </Grid>
              <Grid item>
                <Image src={SA} alt="National Youth Development" width="100%" height={50} />
              </Grid>
              <Grid item>
                <Image src={Projecty} alt="Project Y World" width="100%" height={50} />
              </Grid>
          </Grid>
        </Box>
      </Container>
    </GradientBackground>
  );
}