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

export default function AuthNav() {
  const { user, logout } = useAuthentication(); 
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
    setSnackbarMessage('Profile updated successfully!'); 
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
              onClick={openMenu} 
            > 
              <MenuIcon /> 
            </IconButton> 
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={closeMenu} 
            > 
              <MenuItem onClick={() => router.push("/")}>Home</MenuItem> 
              <MenuItem onClick={() => router.push("/about")}>About</MenuItem> 
              <MenuItem onClick={() => router.push("/jobs")}>Jobs</MenuItem> 
              <MenuItem onClick={() => router.push("/contact")}>Contact</MenuItem> 
              <MenuItem onClick={openPageMenu}> 
                Community <KeyboardArrowDownIcon /> 
              </MenuItem> 
              <Menu 
                anchorEl={pageAnchorEl} 
                open={Boolean(pageAnchorEl)} 
                onClose={closePageMenu} 
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
            <Button onClick={() => router.push("/")} sx={navLinkStyles}>Home</Button> 
            <Button onClick={() => router.push("/about")} sx={navLinkStyles}>About</Button> 
            <Button onClick={() => router.push("/jobs")} sx={navLinkStyles}>Jobs</Button> 
            <Button onClick={() => router.push("/contact")} sx={navLinkStyles}>Contact</Button> 
            <Button 
              sx={navLinkStyles} 
              endIcon={<KeyboardArrowDownIcon />} 
              onClick={openPageMenu} 
            > 
              Community 
            </Button> 
            <Menu 
              anchorEl={pageAnchorEl} 
              open={Boolean(pageAnchorEl)} 
              onClose={closePageMenu} 
            > 
              <MenuItem onClick={() => router.push("/blog")}>Blog</MenuItem> 
              <MenuItem onClick={() => router.push("/forum")}>Forum</MenuItem> 
              <MenuItem onClick={() => router.push("/events")}>Events</MenuItem> 
              <MenuItem onClick={() => router.push("/education")}>Education</MenuItem> 
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
        onClose={closeSnackbar} 
        message={snackbarMessage} 
        autoHideDuration={3000} 
      /> 

      <Dialog open={dialogOpen} onClose={closeDialog}> 
        <DialogTitle>Account Settings</DialogTitle> 
        <DialogContent> 
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}> 
            <Avatar src={newProfileImage} sx={{ width: 100, height: 100, mr: 2 }} /> 
            <label htmlFor="image-upload"> 
              <ImageButtonStyled 
                variant="contained" 
                component="span" 
                startIcon={<AddAPhotoIcon />} 
              > 
                Change Image 
              </ImageButtonStyled> 
            </label> 
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }} 
              onChange={changeImage} 
            /> 
            {newProfileImage && ( 
              <IconButton 
                onClick={() => setNewProfileImage(null)} 
                size="small" 
                color="secondary" 
              > 
                <RemoveCircleOutlineIcon /> 
              </IconButton> 
            )} 
          </div> 
          <TextField 
            label="Name" 
            fullWidth 
            variant="outlined" 
            value={userInfo.name} 
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} 
            margin="normal" 
          /> 
          <TextField 
            label="Email" 
            fullWidth 
            variant="outlined" 
            value={userInfo.email} 
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} 
            margin="normal" 
          /> 
          <TextField 
            label="Job" 
            fullWidth 
            variant="outlined" 
            value={userInfo.job} 
            onChange={(e) => setUserInfo({ ...userInfo, job: e.target.value })} 
            margin="normal" 
          /> 
          <TextField 
            label="Address" 
            fullWidth 
            variant="outlined" 
            value={userInfo.address} 
            onChange={(e) => setUserInfo({ ...userInfo, address: e.target.value })} 
            margin="normal" 
          /> 
        </DialogContent> 
        <DialogActions> 
          <Button onClick={closeDialog}>Cancel</Button> 
          <Button onClick={updateProfile}>Update</Button> 
        </DialogActions> 
      </Dialog> 
    </AppBar> 
  ); 
}
