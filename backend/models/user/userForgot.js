const mongoose = require('mongoose');

const userForgotSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  resetToken: {
    type: String,
    required: true
  },
  tokenExpiry: {
    type: Date,
    required: true
  }
});

const UserForgot = mongoose.model('UserForgot', userForgotSchema);

module.exports = UserForgot;
