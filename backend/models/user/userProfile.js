// REQUIRED PACKAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// SCHEMA FOR USER PROFILES
const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true }, 
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [5, "Username must be at least 5 characters long"],
      maxlength: [20, "Username cannot be longer than 20 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: { 
      type: String, 
      required: true, 
      minlength: [8, "Password must be at least 8 characters long"],
      
    },
    firstName: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, "Please enter a valid first name"],
    },
    lastName: {
      type: String,
      required: true,
      match: [/^[a-zA-Z]+$/, "Please enter a valid last name"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"], 
    },
    bio: { type: String, default: "" },
    address: { type: String, default: "" },
    location: { type: String, default: "" },
    avatar: { type: String, default: "" },
    socialLinks: { type: [String], default: [] },
    savedJobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
    savedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    forums: [{ type: Schema.Types.ObjectId, ref: "Forum" }],
    blogs: [{ type: Schema.Types.ObjectId, ref: "Blog" }],
  },
  {
    timestamps: true,
  }
);

// MIDDLEWARE TO HASH PASSWORD BEFORE SAVING
ProfileSchema.pre("save", async function (next) {
  const profile = this;

  
  if (!profile.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    profile.password = await bcrypt.hash(profile.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// EXPORTING THE USER MODEL
const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;
