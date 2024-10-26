"use client";

import React, { useState, useMemo, useCallback } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Fade } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../next.config/i18n.changeLanguage'; 

const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  JOBS: "/jobs",
  CONTACT: "/contact",
  BLOG: "/blog",
  FORUM: "/forum",
  EVENTS: "/events",
  BUSINESS: "/Business",
  LOGIN: "/account/login",
  REGISTER: "/account/register",
};

export default function Navbar() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handlePageOpen = useCallback((event) => {
    setPageAnchorEl(event.currentTarget);
  }, []);

  const handlePageClose = useCallback(() => {
    setPageAnchorEl(null);
  }, []);

  const navigateTo = useCallback((route) => () => {
    try {
      router.push(route);
    } catch (error) {
      console.error('Navigation failed:', error);
       // Implement user-friendly error handling here
    }
    handleMenuClose();
    handlePageClose();
  }, [router, handleMenuClose, handlePageClose]);

  const isActive = useCallback((route) => pathname === route, [pathname]);

  const navLinksStyles = useCallback((active) => ({
    color: active ? "#6c63ff" : "#000000",
    textTransform: "none",
    fontWeight: active ? "bold" : "normal",
    transition: "all 0.3s ease",
  }), []);

  const registerButtonStyles = {
    backgroundColor: "#6c63ff",
    color: "#ffffff",
    padding: "8px 30px",
    border: "1px solid #6c63ff",
    textTransform: "none",
    borderRadius: "16px",
    "&:hover": {
      backgroundColor: "#5A52D5"
    },
    transition: "all 0.3s ease",
  };

  const MenuItemComponent = useCallback(({ route, children }) => (
    <MenuItem 
      onClick={navigateTo(route)}
      selected={isActive(route)}
    >
      {children}
    </MenuItem>
  ), [navigateTo, isActive]);

  const MobileMenu = useMemo(() => (
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
        TransitionComponent={Fade}
        MenuListProps={{
          'aria-labelledby': 'mobile-menu-button',
        }}
      >
        
        <MenuItem>
          <LanguageSwitcher />
        </MenuItem>
        <MenuItemComponent route={ROUTES.HOME}>{t('Navbar.Home')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.ABOUT}>{t('Navbar.About')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.JOBS}>{t('Navbar.Jobs')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.CONTACT}>{t('Navbar.Contact')}</MenuItemComponent>
        <MenuItem onClick={handlePageOpen}>
          {t('Navbar.Community')} <KeyboardArrowDownIcon />
        </MenuItem>
        <Menu
          anchorEl={pageAnchorEl}
          open={Boolean(pageAnchorEl)}
          onClose={handlePageClose}
          TransitionComponent={Fade}
        >
          <MenuItemComponent route={ROUTES.BLOG}>{t('Navbar.Blog')}</MenuItemComponent>
          <MenuItemComponent route={ROUTES.FORUM}>{t('Navbar.Forum')}</MenuItemComponent>
          <MenuItemComponent route={ROUTES.EVENTS}>{t('Navbar.Events')}</MenuItemComponent>
          <MenuItemComponent route={ROUTES.BUSINESS}>{t('Navbar.Business')}</MenuItemComponent>
        </Menu>
        <MenuItemComponent route={ROUTES.LOGIN}>{t('Navbar.Login')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.REGISTER}>{t('Navbar.Register')}</MenuItemComponent>
      </Menu>
    </>
  ), [anchorEl, pageAnchorEl, handleMenuOpen, handleMenuClose, handlePageOpen, handlePageClose, MenuItemComponent, t]);

  const DesktopMenu = useMemo(() => (
    <>
      
      <LanguageSwitcher />
      <Button onClick={navigateTo(ROUTES.HOME)} sx={navLinksStyles(isActive(ROUTES.HOME))}>{t('Navbar.Home')}</Button>
      <Button onClick={navigateTo(ROUTES.ABOUT)} sx={navLinksStyles(isActive(ROUTES.ABOUT))}>{t('Navbar.About')}</Button>
      <Button onClick={navigateTo(ROUTES.JOBS)} sx={navLinksStyles(isActive(ROUTES.JOBS))}>{t('Navbar.Jobs')}</Button>
      <Button onClick={navigateTo(ROUTES.CONTACT)} sx={navLinksStyles(isActive(ROUTES.CONTACT))}>{t('Navbar.Contact')}</Button>
      <Button
        sx={navLinksStyles(isActive(ROUTES.BLOG) || isActive(ROUTES.FORUM) || isActive(ROUTES.EVENTS) || isActive(ROUTES.BUSINESS))}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={handlePageOpen}
        aria-controls="community-menu"
        aria-haspopup="true"
      >
        {t('Navbar.Community')}
      </Button>
      <Menu
        id="community-menu"
        anchorEl={pageAnchorEl}
        open={Boolean(pageAnchorEl)}
        onClose={handlePageClose}
        TransitionComponent={Fade}
      >
        <MenuItemComponent route={ROUTES.BLOG}>{t('Navbar.Blog')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.FORUM}>{t('Navbar.Forum')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.EVENTS}>{t('Navbar.Events')}</MenuItemComponent>
        <MenuItemComponent route={ROUTES.BUSINESS}>{t('Navbar.Business')}</MenuItemComponent>
      </Menu>
      <Button onClick={navigateTo(ROUTES.LOGIN)} sx={navLinksStyles(isActive(ROUTES.LOGIN))}>{t('Navbar.Login')}</Button>
      <Button
        onClick={navigateTo(ROUTES.REGISTER)}
        sx={registerButtonStyles}
      >
        {t('Navbar.Register')}
      </Button>
    </>
  ), [pageAnchorEl, handlePageOpen, handlePageClose, navigateTo, navLinksStyles, isActive, MenuItemComponent, t]);

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
          sx={{ 
            flexGrow: 1, 
            fontWeight: "bold", 
            color: "#000000",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
            },
          }}
          onClick={navigateTo(ROUTES.HOME)}
        >
          SIS<span style={{ color: "#6c63ff" }}>O</span>NKE
        </Typography>

        {isMobile ? MobileMenu : DesktopMenu}
      </Toolbar>
    </AppBar>
  );
}
