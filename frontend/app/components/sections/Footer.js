"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Grid, Typography, IconButton, Link as MuiLink } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import Link from 'next/link';
import TermsOfServiceModal from './TermsOfServiceModal'; 
import PrivacyPolicyModal from './PrivacyPolicyModal'; 

const Footer = () => {
  const { t } = useTranslation();
  const [openTermsModal, setOpenTermsModal] = useState(false); 
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false); 

  const handleOpenTerms = () => {
    setOpenTermsModal(true);
  };

  const handleCloseTerms = () => {
    setOpenTermsModal(false);
  };

  const handleOpenPrivacy = () => {
    setOpenPrivacyModal(true);
  };

  const handleClosePrivacy = () => {
    setOpenPrivacyModal(false);
  };

  return (
    <Box component="footer" sx={{ background: 'linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={3}>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "700" }} variant="h6" color="text.primary" gutterBottom>
                SIS<span style={{ color: '#6c63ff' }}>O</span>NKE
              </Typography>
            </Box>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              {t('Footer.Address')}
            </Typography>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              info@sisonke.co.za
            </Typography>
            <Typography sx={{ marginBottom: "15px" }} variant="body2" color="text.secondary">
              +27 12 345 6789
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton 
                sx={{ 
                  color: "#6c63ff", 
                  border: "1px solid #6c63ff", 
                  marginRight: "10px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderRadius: "50%",
                    backgroundColor: "#6c63ff",
                    color: "white"
                  }
                }} 
                aria-label="Twitter" 
                href="https://twitter.com"
              >
                <Twitter />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: "#6c63ff", 
                  border: "1px solid #6c63ff", 
                  marginRight: "10px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderRadius: "50%",
                    backgroundColor: "#6c63ff",
                    color: "white"
                  }
                }} 
                aria-label="LinkedIn" 
                href="https://linkedin.com"
              >
                <LinkedIn />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: "#6c63ff", 
                  border: "1px solid #6c63ff", 
                  marginRight: "10px",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderRadius: "50%",
                    backgroundColor: "#6c63ff",
                    color: "white"
                  }
                }} 
                aria-label="Instagram" 
                href="https://instagram.com"
              >
                <Instagram />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: "#6c63ff", 
                  border: "1px solid #6c63ff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderRadius: "50%",
                    backgroundColor: "#6c63ff",
                    color: "white"
                  }
                }} 
                aria-label="Facebook" 
                href="https://facebook.com"
              >
                <Facebook />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {t('Footer.Community')}
            </Typography>
            <Link href="/blog" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Blog')}
              </MuiLink>
            </Link>
            <Link href="/forum" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Forum')}
              </MuiLink>
            </Link>
            <Link href="/events" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Events')}
              </MuiLink>
            </Link>
            <Link href="/Business" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Businesses')}
              </MuiLink>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {t('Footer.Company')}
            </Typography>
            <Link href="/" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Home')}
              </MuiLink>
            </Link>
            <Link href="/about" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.AboutUs')}
              </MuiLink>
            </Link>
            <Link href="/jobs" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.Jobs')}
              </MuiLink>
            </Link>
            <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
              {t('Footer.FAQs')}
             </MuiLink>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {t('Footer.Support')}
            </Typography>
            <Link href="/contact" passHref>
              <MuiLink sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none' }} variant="body2" display="block">
                {t('Footer.ContactUs')}
              </MuiLink>
            </Link>
            <MuiLink 
              sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none', cursor: 'pointer' }} 
              onClick={handleOpenPrivacy}
              variant="body2" 
              display="block">
              {t('Footer.PrivacyPolicy')}
            </MuiLink>
            <MuiLink 
              sx={{ color: 'text.secondary', marginBottom: '10px', textDecoration: 'none', cursor: 'pointer' }} 
              onClick={handleOpenTerms}
              variant="body2" 
              display="block">
              {t('Footer.TermsOfService')}
            </MuiLink>
          </Grid>
        </Grid>
      </Container>
      <TermsOfServiceModal open={openTermsModal} handleClose={handleCloseTerms} />
      <PrivacyPolicyModal open={openPrivacyModal} handleClose={handleClosePrivacy} />
    </Box>
  );
};

export default Footer;
