const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/userForgot");
require('dotenv').config(); 

// Controller to handle forgot the password logic
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User with this email does not exist." });
    }

    // Generate a reset token and set expiration (1 hour)
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    // Save the token to the user's record
    await user.save();

    // Create the reset URL
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,  
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <p>You have requested a password reset.</p>
        <p>Please click on the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
        return res.status(500).json({ message: "Error sending email." });
      }
      res.json({ message: "A reset link has been sent to your email." });
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
