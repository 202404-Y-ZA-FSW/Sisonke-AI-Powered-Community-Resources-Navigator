import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { AccountCircle, ExitToApp, Edit, VisibilityOff, Delete } from '@mui/icons-material';

const SettingsMenu = ({ user, onLogout, toggleIncognito, isIncognito }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAccountSettings, setOpenAccountSettings] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username || '',
    email: user.email,
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    socialLinks: user.socialLinks || { twitter: '', linkedIn: '' },
    country: '',
    city: '',
    postalCode: '',
    taxId: '',
  });

  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('profileImage') || user.profileImage || null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAccountSettingsOpen = () => {
    setOpenAccountSettings(true);
    handleMenuClose();
  };

  const handleAccountSettingsClose = () => {
    setOpenAccountSettings(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    localStorage.removeItem('profileImage');
  };

  const handleFormSubmit = () => {
    console.log('Updated user details:', formData);
    handleAccountSettingsClose();
  };

  return (
    <Box>
      <IconButton onClick={handleMenuOpen}>
        <Avatar alt={user.name} src={selectedImage} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 4,
          sx: {
            width: '260px',
            borderRadius: 2,
            bgcolor: 'background.paper',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <Avatar alt={user.name} src={selectedImage} sx={{ mr: 2 }} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">{formData.username}</Typography>
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={handleAccountSettingsOpen}>
          <AccountCircle sx={{ mr: 1 }} />
          Account settings
        </MenuItem>

        <MenuItem>
          <VisibilityOff sx={{ mr: 1 }} />
          Go incognito
          <Switch edge="end" checked={isIncognito} onChange={toggleIncognito} sx={{ ml: 'auto' }} />
        </MenuItem>

        <Divider />

        <MenuItem onClick={onLogout}>
          <ExitToApp sx={{ mr: 1 }} />
          Log out
        </MenuItem>
      </Menu>

      <Dialog open={openAccountSettings} onClose={handleAccountSettingsClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: 'center' }}>Account Settings</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar alt="Profile Image Preview" src={selectedImage} sx={{ width: 64, height: 64, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">{formData.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {formData.username}
                    </Typography>
                  </Box>
                  <IconButton sx={{ ml: 'auto' }} onClick={() => document.getElementById('profile-image-upload').click()}>
                    <Edit />
                  </IconButton>
                  <IconButton sx={{ ml: 1 }} onClick={handleRemoveImage}>
                    <Delete />
                  </IconButton>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Box>

                <Divider />

                <Typography variant="h6" sx={{ mt: 3 }}>
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="First Name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleFormChange}
                      fullWidth
                      multiline
                      rows={2}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h6" sx={{ mt: 3 }}>
                  Address
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      label="Postal Code"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleFormChange}
                      fullWidth
                    />
                  </Grid>                  
                </Grid>

                <Button variant="contained" onClick={handleFormSubmit} fullWidth sx={{ mt: 3 }}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SettingsMenu;
