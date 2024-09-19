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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";


export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);


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


  return (
    <AppBar
      sx={{ backgroundColor: "#fbf8e1" }}
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
          SIS<span style={{ color: "#ffffff" }}>O</span>NKE
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
              <MenuItem href="/" onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem href="/about" onClick={handleMenuClose}>About</MenuItem>
              <MenuItem href="/jobs" onClick={handleMenuClose}>Jobs</MenuItem>
              <MenuItem href="/contact" onClick={handleMenuClose}>Contact</MenuItem>
              <MenuItem href="/community" onClick={handleMenuClose}>Community</MenuItem>
              <MenuItem href="/login" onClick={handleMenuClose}>Login</MenuItem>
              <MenuItem href="/register" onClick={handleMenuClose}>Register</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button href="/" sx={navLinksStyles}>Home</Button>
            <Button href="/about" sx={navLinksStyles}>About</Button>
            <Button href="/jobs" sx={navLinksStyles}>Jobs</Button>
            <Button href="/contact" sx={navLinksStyles}>Contact</Button>
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
              <MenuItem href="/blog" onClick={handlePageClose}>Blog</MenuItem>
              <MenuItem href="/forum" onClick={handlePageClose}>Forum</MenuItem>
              <MenuItem href="/events" onClick={handlePageClose}>Events</MenuItem>
              <MenuItem href="/education" onClick={handlePageClose}>Education</MenuItem>
            </Menu>
            <Button sx={navLinksStyles}>Login</Button>
            <Button
              sx={{
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "8px 30px",
                border: "1px solid #000000",
                textTransform: "none",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
