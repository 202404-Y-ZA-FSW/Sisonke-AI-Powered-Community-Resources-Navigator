import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
          We value your privacy. Here's how we handle your data:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Data Collection" 
              secondary="We collect info you provide and usage data."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Usage" 
              secondary="We use your info to improve the platform and services."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Security" 
              secondary="We take steps to protect your data."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ShareIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Third-Parties" 
              secondary="We don't share your data without consent."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Updates" 
              secondary="We may change this policy. Continued use means acceptance."
            />
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            Contact us at info@sisonke.co.za for any questions.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
