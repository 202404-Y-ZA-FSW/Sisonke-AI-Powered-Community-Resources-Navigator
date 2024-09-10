// REQUIRED PACKAGE
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SCHEMA FOR USER PROFILES
const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phoneNumber: { type: String, default: "" },
    gender: { type: String, default: "" },
    address: { type: String, default: "" },
    location: { type: String, default: "" },
    avatar: { type: String, default: "" },
    socialLinks: { type: [String], default: [] },
    bio: { type: String, default: "" },
    savedJobs: { type: [Schema.Types.ObjectId], ref: "Job", default: [] },
    savedEvents: { type: [Schema.Types.ObjectId], ref: "Event", default: [] },
    forums: { type: [Schema.Types.ObjectId], ref: "Forum", default: [] },
  },
  {
    timestamps: true,
  }
);

// EXPORTING THE USER MODEL
const Profile = mongoose.model("Profile", ProfileSchema);
module.exports = Profile;