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
import { useRouter } from "next/navigation";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../next.config/i18n.changeLanguage"; // Import LanguageSwitcher
import { useAuthentication } from "@/app/hooks/useAuthentication";

export default function AuthNav() {
  const { t } = useTranslation();
  const { user, logout } = useAuthentication();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [pageAnchorEl, setPageAnchorEl] = useState(null);
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

  const isAdmin = user && user.user.role === "administrator";

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
          {t("authnav.brand", { defaultValue: "SISONKE" })}
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
              <MenuItem>
                <LanguageSwitcher /> {/* Add Language Switcher */}
              </MenuItem>
              {isAdmin ? (
                <MenuItem onClick={() => router.push("/dashboard")}>
                  {t("authnav.dashboard")}
                </MenuItem>
              ) : (
                <MenuItem onClick={() => router.push("/")}>
                  {t("authnav.home")}
                </MenuItem>
              )}
              <MenuItem onClick={() => router.push("/about")}>{t("authnav.about")}</MenuItem>
              <MenuItem onClick={() => router.push("/jobs")}>{t("authnav.jobs")}</MenuItem>
              <MenuItem onClick={() => router.push("/contact")}>{t("authnav.contact")}</MenuItem>
              <MenuItem onClick={handlePageOpen}>
                {t("authnav.community")} <KeyboardArrowDownIcon />
              </MenuItem>
              <Menu
                anchorEl={pageAnchorEl}
                open={Boolean(pageAnchorEl)}
                onClose={handlePageClose}
              >
                <MenuItem onClick={() => router.push("/blog")}>{t("authnav.blog")}</MenuItem>
                <MenuItem onClick={() => router.push("/forum")}>{t("authnav.forum")}</MenuItem>
                <MenuItem onClick={() => router.push("/events")}>{t("authnav.events")}</MenuItem>
                <MenuItem onClick={() => router.push("/Business")}>{t("authnav.businesses")}</MenuItem>
              </Menu>
              {user ? (
                <MenuItem onClick={logout}>{t("authnav.logout")}</MenuItem>
              ) : (
                <>
                  <MenuItem onClick={() => router.push("/account/login")}>
                    {t("authnav.login")}
                  </MenuItem>
                  <MenuItem onClick={() => router.push("/account/register")}>
                    {t("authnav.register")}
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <>
            <LanguageSwitcher /> {/* Add Language Switcher */}
            {isAdmin ? (
              <Button
                onClick={() => router.push("/dashboard")}
                sx={navLinksStyles}
              >
                {t("authnav.dashboard")}
              </Button>
            ) : (
              <Button onClick={() => router.push("/")} sx={navLinksStyles}>
                {t("authnav.home")}
              </Button>
            )}
            <Button onClick={() => router.push("/about")} sx={navLinksStyles}>
              {t("authnav.about")}
            </Button>
            <Button onClick={() => router.push("/jobs")} sx={navLinksStyles}>
              {t("authnav.jobs")}
            </Button>
            <Button onClick={() => router.push("/contact")} sx={navLinksStyles}>
              {t("authnav.contact")}
            </Button>
            <Button
              sx={navLinksStyles}
              endIcon={<KeyboardArrowDownIcon />}
              onClick={handlePageOpen}
            >
              {t("authnav.community")}
            </Button>
            <Menu
              anchorEl={pageAnchorEl}
              open={Boolean(pageAnchorEl)}
              onClose={handlePageClose}
            >
              <MenuItem onClick={() => router.push("/blog")}>{t("authnav.blog")}</MenuItem>
              <MenuItem onClick={() => router.push("/forum")}>{t("authnav.forum")}</MenuItem>
              <MenuItem onClick={() => router.push("/events")}>{t("authnav.events")}</MenuItem>
              <MenuItem onClick={() => router.push("/Business")}>
                {t("authnav.businesses")}
              </MenuItem>
            </Menu>
            {user ? (
              <Button
                onClick={logout}
                sx={{
                  backgroundColor: "#6c63ff",
                  color: "#ffffff",
                  padding: "8px 30px",
                  border: "1px solid #6c63ff",
                  textTransform: "none",
                  borderRadius: "16px",
                  "&:hover": {
                    backgroundColor: "#5A52D5",
                  },
                }}
              >
                {t("authnav.logout")}
              </Button>
            ) : (
              <>
                <Button
                  onClick={() => router.push("/account/login")}
                  sx={navLinksStyles}
                >
                  {t("authnav.login")}
                </Button>
                <Button
                  onClick={() => router.push("/account/register")}
                  sx={navLinksStyles}
                >
                  {t("authnav.register")}
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
