const mongoose = require("mongoose");
const crypto = require("crypto");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive", "restricted"], default: "active" },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "administrator", "ngo"], default: "user" },

    // Fields for password reset functionality
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Fields for email verification functionality
    verificationToken: String,
    verificationTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

// Method to generate password reset token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set reset token in schema
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // Set token expiration (e.g., 10 minutes)
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

// Method to generate email verification token
UserSchema.methods.getVerificationToken = function () {
  // Generate token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  // Hash and set verification token in schema
  this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

  // Set token expiration (e.g., 24 hours)
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  return verificationToken;
};

// EXPORTING USER MODEL
const User = mongoose.model("User", UserSchema);
module.exports = User;
