"use client";

import React, { useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Box, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";  
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsMenu from './userProfile'; 

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);
  const [errors,setErrors] = useState(null);

  const router = useRouter();  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePageOpen = (event) => {
    setPageAnchorEl(event.currentTarget);
  };

  const handlePageClose = () => {
    setPageAnchorEl(null);
  };

  const navLinksStyles = {
    color: "#000000",
    textTransform: "none",
  };

  const user = {
    name: "John Doe",
    username: "johndoe",
    email: "johndoe@example.com",
    profileImage: "",
    bio: "This is my bio",
    phone: "123456789",
    location: "New York, USA",
    socialLinks: { twitter: "", linkedIn: "" },
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/account/logout");
      console.log(response.data);
      if (response.status === 200) {
        router.push("/account/login");
      } else {
        setErrors(response.data.message); 
      }
    } catch (error) {
      setErrors(error.message);  
    }
  };
  

  const toggleIncognito = () => {

  };

  const isIncognito = false;

  return (
    <AppBar
      sx={{ 
        background: "linear-gradient(135deg, #e6f7ff 0%, #fff5e6 100%)", 
        position: 'fixed', 
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200
      }}
      color="transparent"
      elevation={0}
    >
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="a"
            sx={{ fontWeight: "bold", color: "#000000", textDecoration: 'none' }}
          >
            SIS<span style={{ color: "#ffffff" }}>O</span>NKE
          </Typography>
        </Link>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2, alignItems: 'center' }}>
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
                  <MenuItem onClick={() => router.push("/businesses")}>Businesses</MenuItem>
                </Menu>

                <MenuItem onClick={() => router.push("/account/login")}>Login</MenuItem>
                <MenuItem onClick={() => router.push("/account/register")}>Register</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={() => router.push("/dashboard")} sx={navLinksStyles}>Dashboard</Button>
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
                <MenuItem onClick={() => router.push("/Businesses")}>Businesses</MenuItem>
              </Menu>
              
              
              <SettingsMenu
                user={user}
                onLogout={handleLogout}
                toggleIncognito={toggleIncognito}
                isIncognito={isIncognito}
              />
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 
