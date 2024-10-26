import React from 'react';
import { Modal, Box, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import ArticleIcon from '@mui/icons-material/Article';
import BuildIcon from '@mui/icons-material/Build';
import LockIcon from '@mui/icons-material/Lock';
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

const TermsOfServiceModal = ({ open, handleClose }) => {
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
          Terms of Service
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          By using Sisonke, you agree to the following:
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <GavelIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="User Conduct" 
              secondary="Follow all laws and respect others in the community."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Account Security" 
              secondary="Keep your account info secure and notify us of any breaches."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ArticleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Content Responsibility" 
              secondary="You own your content. We are not liable for it."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BuildIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Service Limitations" 
              secondary="We are not responsible for service interruptions or errors."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LockIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Privacy" 
              secondary="Your data is protected. See our Privacy Policy for details."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Modifications" 
              secondary="We may update these terms. Continued use means acceptance."
            />
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            For inquiries, contact us at info@sisonke.co.za
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermsOfServiceModal;
