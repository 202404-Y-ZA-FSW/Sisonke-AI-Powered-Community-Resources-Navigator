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

const StyledIconButton = styled(IconButton)({
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

// Define the button styles to be used for the image buttons
const ImageButton = styled(Button)({
  borderRadius: "15px",
  backgroundColor: "#6c63ff",
  color: "#ffffff",
  textTransform: "none",
  padding: "8px 30px",
  marginRight: "8px", // Add some margin for spacing
  '&:hover': {
    backgroundColor: "#5a53d1", // Darken color on hover
  },
});

export default function AuthNav() {
  const { logout } = useAuthentication();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', job: '', address: '' });
  const [newProfileImage, setNewProfileImage] = useState(null); // Store new image
  const [profileImage, setProfileImage] = useState(null); // Actual displayed image

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handlePageOpen = (event) => setPageAnchorEl(event.currentTarget);
  const handlePageClose = () => setPageAnchorEl(null);
  const handleProfileOpen = (event) => setProfileAnchorEl(event.currentTarget);
  const handleProfileClose = () => setProfileAnchorEl(null);
  const handleSnackbarClose = () => setSnackbarOpen(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
    handleProfileClose();
  };
  const handleDialogClose = () => setDialogOpen(false);
  const handleUpdateProfile = () => {
    // Update the displayed profile image only when the update button is pressed
    if (newProfileImage) {
      setProfileImage(newProfileImage);
    }
    setSnackbarMessage('Profile updated successfully!');
    setSnackbarOpen(true);
    handleDialogClose();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result); // Update new image state
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setNewProfileImage(null); // Clear new image state
  };

  const navLinksStyles = {
    color: "#000000",
    textTransform: "none",
  };

  return (
    <AppBar
      sx={{ background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)" }}
      position="static"
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold", color: "#000000" }}
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
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => router.push("/")}>Home</MenuItem>
              <MenuItem onClick={() => router.push("/about")}>About</MenuItem>
              <MenuItem onClick={() => router.push("/jobs")}>Jobs</MenuItem>
              <MenuItem onClick={() => router.push("/contact")}>Contact</MenuItem>
              <MenuItem onClick={handlePageOpen}>
                Community <KeyboardArrowDownIcon />
              </MenuItem>
              <Menu
                anchorEl={pageAnchorEl}
                open={Boolean(pageAnchorEl)}
                onClose={handlePageClose}
              >
                <MenuItem onClick={() => router.push("/blog")}>Blog</MenuItem>
                <MenuItem onClick={() => router.push("/forum")}>Forum</MenuItem>
                <MenuItem onClick={() => router.push("/events")}>Events</MenuItem>
                <MenuItem onClick={() => router.push("/education")}>Education</MenuItem>
              </Menu>
              <MenuItem onClick={() => router.push("/account/login")}>Login</MenuItem>
              <MenuItem onClick={() => router.push("/account/register")}>Register</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/")} sx={navLinksStyles}>Home</Button>
            <Button onClick={() => router.push("/about")} sx={navLinksStyles}>About</Button>
            <Button onClick={() => router.push("/jobs")} sx={navLinksStyles}>Jobs</Button>
            <Button onClick={() => router.push("/contact")} sx={navLinksStyles}>Contact</Button>
            <Button
              sx={navLinksStyles}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handlePageOpen}
            >
              Community
            </Button>
            <Menu
              anchorEl={pageAnchorEl}
              open={Boolean(pageAnchorEl)}
              onClose={handlePageClose}
            >
              <MenuItem onClick={() => router.push("/blog")}>Blog</MenuItem>
              <MenuItem onClick={() => router.push("/forum")}>Forum</MenuItem>
              <MenuItem onClick={() => router.push("/events")}>Events</MenuItem>
              <MenuItem onClick={() => router.push("/education")}>Education</MenuItem>
            </Menu>
            <StyledIconButton onClick={handleProfileOpen} sx={{ ml: 1 }}>
              {profileImage ? (
                <Avatar src={profileImage} sx={{ width: 40, height: 40 }} />
              ) : (
                <PersonIcon />
              )}
            </StyledIconButton>
            <Menu
              anchorEl={profileAnchorEl}
              open={Boolean(profileAnchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleDialogOpen}>
                <AccountCircleIcon sx={{ mr: 1 }} />
                Account Settings
              </MenuItem>
              <MenuItem onClick={logout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        autoHideDuration={3000}
      />

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Account Settings</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <Avatar src={newProfileImage} sx={{ width: 100, height: 100, marginRight: 2 }} />
            <div>
              <input
                accept="image/*"
                id="upload-image"
                type="file"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              <label htmlFor="upload-image">
                <ImageButton component="span" startIcon={<AddAPhotoIcon />}>
                  Change Image
                </ImageButton>
              </label>
              <ImageButton
                variant="contained"
                color="error"
                onClick={handleRemoveImage}
                startIcon={<RemoveCircleOutlineIcon />}
              >
                Remove Image
              </ImageButton>
            </div>
          </div>
          <TextField
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Job"
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.job}
            onChange={(e) => setUserInfo({ ...userInfo, job: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            value={userInfo.address}
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateProfile} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
