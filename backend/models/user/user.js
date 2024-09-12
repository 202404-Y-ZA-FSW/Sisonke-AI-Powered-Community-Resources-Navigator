// REQUIRED PACKAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ["user", "administrator", "ngo"], default: "user" },
  },
  {
    timestamps: true,
  }
);

// EXPORTING USER MODEL
const User = mongoose.model("User", UserSchema);
module.exports = User;