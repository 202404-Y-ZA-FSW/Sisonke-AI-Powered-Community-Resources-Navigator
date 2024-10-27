"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  styled,
  Avatar,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/app/hooks/useAuthentication";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import LanguageSwitcher from '../../next.config/i18n.changeLanguage'; 

const IconButtonStyled = styled(IconButton)({
  width: 40,
  height: 40,
  backgroundColor: "#D3D3D3",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease",
  '&:hover': {
    backgroundColor: "#A9A9A9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  '& svg': {
    width: 24,
    height: 24,
    fill: "#FFF",
  }
});

const ImageButtonStyled = styled(Button)({
  borderRadius: "15px",
  backgroundColor: "#6c63ff",
  color: "#ffffff",
  textTransform: "none",
  padding: "8px 30px",
  marginRight: "8px",
  '&:hover': {
    backgroundColor: "#5a53d1",
  },
});

const NavButtonStyled = styled(Button)(({ isActive }) => ({
  color: isActive ? "#6c63ff" : "#000000",
  fontWeight: isActive ? "bold" : "normal",
  fontSize: "14px",
  textTransform: "none",
  '&:hover': {
    color: "#6c63ff",
  },
}));

export default function AuthNav() {
  const { user, logout } = useAuthentication();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { t } = useTranslation(); // Use the translation hook

  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', job: '', address: '' });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const openPageMenu = (event) => setPageAnchorEl(event.currentTarget);
  const closePageMenu = () => setPageAnchorEl(null);
  const openProfileMenu = (event) => setProfileAnchorEl(event.currentTarget);
  const closeProfileMenu = () => setProfileAnchorEl(null);
  const closeSnackbar = () => setSnackbarOpen(false);
  const openDialog = () => {
    setDialogOpen(true);
    closeProfileMenu();
  };
  const closeDialog = () => setDialogOpen(false);
  const updateProfile = () => {
    if (newProfileImage) {
      setProfileImage(newProfileImage);
    } else {
      setProfileImage(null);
    }
    setSnackbarMessage(t('profileUpdated')); 
    setSnackbarOpen(true);
    closeDialog();
  };

  const changeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const navLinkStyles = {
    color: "#000000",
    textTransform: "none",
  };

  const isAdmin = user && user.user.role === "administrator";

  return (
    <AppBar
      sx={{
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)",
        padding: "8px 16px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
      }}
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#4A4A4A", fontSize: "24px" }}
        >
          SIS<span style={{ color: "#6c63ff" }}>O</span>NKE
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={openMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
              <LanguageSwitcher />
              {isAdmin ? (
                <MenuItem onClick={() => router.push("/dashboard")}>{t('dashboard')}</MenuItem>
              ) : (
                <MenuItem onClick={() => router.push("/")}>{t('home')}</MenuItem>
              )}
              <MenuItem onClick={() => router.push("/about")}>{t('about')}</MenuItem>
              <MenuItem onClick={() => router.push("/jobs")}>{t('jobs')}</MenuItem>
              <MenuItem onClick={() => router.push("/contact")}>{t('contact')}</MenuItem>
              <MenuItem onClick={openPageMenu}>
                {t('community')} <KeyboardArrowDownIcon />
              </MenuItem>
              <Menu anchorEl={pageAnchorEl} open={Boolean(pageAnchorEl)} onClose={closePageMenu}>
                <MenuItem onClick={() => router.push("/blog")}>{t('blog')}</MenuItem>
                <MenuItem onClick={() => router.push("/forum")}>{t('forum')}</MenuItem>
                <MenuItem onClick={() => router.push("/events")}>{t('events')}</MenuItem>
                <MenuItem onClick={() => router.push("/Business")}>{t('businesses')}</MenuItem>
              </Menu>
             
            </Menu>
          </>
        ) : (
          <>
            <LanguageSwitcher sx={{ mr: 2 }} />
            <NavButtonStyled onClick={() => router.push("/")}>{t('home')}</NavButtonStyled>
            <NavButtonStyled onClick={() => router.push("/about")}>{t('about')}</NavButtonStyled>
            <NavButtonStyled onClick={() => router.push("/jobs")}>{t('jobs')}</NavButtonStyled>
            <NavButtonStyled onClick={() => router.push("/contact")}>{t('contact')}</NavButtonStyled>
            <NavButtonStyled endIcon={<KeyboardArrowDownIcon />} onClick={openPageMenu}>
              {t('community')}
            </NavButtonStyled>
            <Menu anchorEl={pageAnchorEl} open={Boolean(pageAnchorEl)} onClose={closePageMenu}>
              <MenuItem onClick={() => router.push("/blog")}>{t('blog')}</MenuItem>
              <MenuItem onClick={() => router.push("/forum")}>{t('forum')}</MenuItem>
              <MenuItem onClick={() => router.push("/events")}>{t('events')}</MenuItem>
              <MenuItem onClick={() => router.push("/Business")}>{t('businesses')}</MenuItem>
            </Menu> 
            <IconButtonStyled onClick={openProfileMenu} sx={{ ml: 1 }}>
              {profileImage ? (
                <Avatar src={profileImage} sx={{ width: 40, height: 40 }} />
              ) : (
                <PersonIcon />
              )}
            </IconButtonStyled>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={closeProfileMenu}
            >
              <MenuItem onClick={openDialog}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                {t('accountSettings')}
              </MenuItem>
              <MenuItem onClick={logout}>
                <LogoutIcon sx={{ mr: 1 }} />
                {t('logout')}
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
      <Snackbar
        open={snackbarOpen}
        onClose={closeSnackbar}
        message={snackbarMessage}
        autoHideDuration={3000}
      />
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{t('updateProfile')}</DialogTitle>
        <DialogContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Avatar src={newProfileImage} sx={{ width: 100, height: 100, marginRight: 2 }} />
            <div>
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: 'none' }}
                onChange={changeImage}
              />
              <label htmlFor="upload-image">
                <ImageButtonStyled component="span" startIcon={<AddAPhotoIcon />}>
                  Change Image
                </ImageButtonStyled>
              </label>
              <ImageButtonStyled
                variant="contained"
                color="secondary"
                onClick={() => setNewProfileImage(null)}
                startIcon={<RemoveCircleOutlineIcon />}
              >
                Remove Image
              </ImageButtonStyled>
            </div>
          </div>
          <TextField
            autoFocus
            margin="dense"
            label={t('name')}
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label={t('email')}
            type="email"
            fullWidth
            variant="outlined"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label={t('job')}
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.job}
            onChange={(e) => setUserInfo({ ...userInfo, job: e.target.value })}
          />
          <TextField
            margin="dense"
            label={t('address')}
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
          />
          <input type="file" onChange={changeImage} />
          {newProfileImage && (
            <Box>
              <img src={newProfileImage} alt="Profile Preview" style={{ width: "100px", height: "100px" }} />
              <IconButtonStyled onClick={() => setNewProfileImage(null)}>
                <RemoveCircleOutlineIcon />
              </IconButtonStyled>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>{t('cancel')}</Button>
          <Button onClick={updateProfile}>{t('save')}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </AppBar>
  );
}
