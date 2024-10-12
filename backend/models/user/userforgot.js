const mongoose = require('mongoose');

const userForgotSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resetToken: {
    type: String,
    required: true
  },
  tokenExpires: {
    type: Date,
    required: true
  }
});

const UserForgot = mongoose.model('UserForgot', userForgotSchema);
module.exports = UserForgot;
