import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

import DataUsageIcon from '@mui/icons-material/DataUsage';
import SecurityIcon from '@mui/icons-material/Security';
import ShareIcon from '@mui/icons-material/Share';
import UpdateIcon from '@mui/icons-material/Update';
import EmailIcon from '@mui/icons-material/Email';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  p: 4,
};

const PrivacyPolicyModal = ({ open, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <IconButton 
          onClick={handleClose} 
          sx={{ 
            position: 'absolute', 
            top: 8, 
            right: 8,
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
          Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          By using Sisonke, you agree to the following privacy terms:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Data Collection" 
              secondary="We collect necessary information to provide and improve our services."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Data Usage" 
              secondary="Your data is used to enhance your experience and our services."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Data Security" 
              secondary="We implement robust measures to protect your personal information."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ShareIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Third-Party Sharing" 
              secondary="We may share data with trusted partners to improve our services."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Policy Updates" 
              secondary="We may update this policy. Continued use means acceptance of changes."
            />
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            For privacy inquiries, contact us at privacy@sisonke.co.za
          </Typography>
        </Box>

      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
