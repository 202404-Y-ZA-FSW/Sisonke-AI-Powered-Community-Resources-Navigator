const UserSchema = require("../../models/user/user");
const User = require("../../models/user/user");
const sendEmail = require("../../utils/sendEmail");
const crypto = require("crypto");

// @desc    Forgot password
// @route   POST /account/forgotpassword
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token
    const resetToken = user.getResetPasswordToken();

    // Save reset token and expiration to user in database
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/reset-password/${resetToken}`;

    // HTML message for email
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please go to this link to reset your password:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    // Send email
    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        html: message,
      });

      res.status(200).json({
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      // Reset password fields in database if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return res.status(500).json({ message: "Email could not be sent" },error);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Reset password
// @route   PUT /account/resetpassword/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    // Get reset token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    // Check if token is valid
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
