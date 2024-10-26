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
          {t('PrivacyPolicy.Title')}
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {t('PrivacyPolicy.Introduction')}
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={t('PrivacyPolicy.DataCollection.Title')}
              secondary={t('PrivacyPolicy.DataCollection.Description')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <DataUsageIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={t('PrivacyPolicy.Usage.Title')}
              secondary={t('PrivacyPolicy.Usage.Description')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={t('PrivacyPolicy.Security.Title')}
              secondary={t('PrivacyPolicy.Security.Description')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <ShareIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={t('PrivacyPolicy.ThirdParties.Title')}
              secondary={t('PrivacyPolicy.ThirdParties.Description')}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary={t('PrivacyPolicy.Updates.Title')}
              secondary={t('PrivacyPolicy.Updates.Description')}
            />
          </ListItem>
        </List>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
          <EmailIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="body2">
            {t('PrivacyPolicy.Contact')}
          </Typography>
        </Box>

      </Box>
    </Modal>
  );
};

export default PrivacyPolicyModal;
