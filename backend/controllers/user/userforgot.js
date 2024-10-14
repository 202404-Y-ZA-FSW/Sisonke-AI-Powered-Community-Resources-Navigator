const crypto = require('crypto');
const User = require('../models/userModel');
const UserForgot = require('../models/userForgotModel');

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpires = Date.now() + 3600000; 

    const userForgot = new UserForgot({
      userId: user._id,
      resetToken,
      tokenExpires
    });
    await userForgot.save();


    res.status(200).json({ message: 'Password reset link sent' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  try {
    
    const userForgot = await UserForgot.findOne({
      resetToken,
      tokenExpires: { $gt: Date.now() }
    });

    if (!userForgot) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(userForgot.userId);
    user.password = newPassword;
    await user.save();

    await UserForgot.findByIdAndDelete(userForgot._id);

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
