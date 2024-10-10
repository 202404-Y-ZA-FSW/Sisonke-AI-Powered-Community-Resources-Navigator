const express = require("express");
const { 
  register, 
  login, 
  updatePassword, 
  currentUser, 
  logout, 
  remove, 
  updateUser, 
  forgotPassword, 
  resetPassword 
} = require("../controllers/authentication"); 
const { check } = require("express-validator"); 

const router = express.Router();

router.post(
  "/register",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  register
);

router.post(
  "/login",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

router.post(
  "/update-password",
  [
    check("currentPassword").notEmpty().withMessage("Current password is required"),
    check("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
  ],
  updatePassword
);

router.get("/current-user", currentUser);
router.post("/logout", logout);
router.delete("/remove", remove);
router.put("/update", updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", 
  [ 
    check("newPassword").isLength({ min: 6 }).withMessage("New password must be at least 6 characters long"),
  ], 
  resetPassword 
);

module.exports = router;
