const { validationResult } = require("express-validator");
const userModel = require("../../models/user/user");
const userProfileModel = require("../../models/user/userProfile");

exports.addUserProfile = async (req, res) => {
  try {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract user identity from JWT
    const userIdentity = req.userID;

    // Verify if the user exists in the database
    const user = await userModel.findById(userIdentity);
    if (!user) {
      return res.status(401).json({ message: "Invalid user identity." });
    }

    // Check if a profile for the user already exists to prevent duplicates
    const existingProfile = await userProfileModel.findOne({ userID: userIdentity });
    if (existingProfile) {
      return res.status(409).json({ message: "Profile already exists for this user." });
    }

    // Destructure and assign request body fields, fallback to user identity
    const {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      gender,
      bio,
      address,
      location,
      avatar,
    } = req.body;

    // Create new profile instance
    const userProfile = new userProfileModel({
      user: userIdentity,
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      gender,
      bio,
      address,
      location,
      avatar,
    });

    // Save the profile to the database
    await userProfile.save();

    // Return success response
    res.status(201).json({
      message: "User profile created successfully.",
      userProfile,
    });
  } catch (error) {
    console.error("Error creating user profile:", error.message);
    res.status(500).json({
      message: "An unexpected error occurred while processing your request.",
    });
  }
};

// GET USER PROFILE
exports.getUserProfile = async (req, res) => {
  try {
    // Extract user ID from JWT token
    const userIdentity = req.userID;

    // Find the user profile by user ID
    const userProfile = await userProfileModel.findOne({ userID: userIdentity });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // Return the user profile
    res.status(200).json({ userProfile });
  } catch (error) {
    res.status(500).json({
      message: "An unexpected error occurred while processing your request.",
    });
  }
};

// UPDATE USER PROFILE
exports.updateUserProfile = async (req, res) => {
  try {
    // Validate incoming request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    // Extract user ID from JWT token
    const userIdentity = req.userID;

    // Find the user profile by user ID
    const userProfile = await userProfileModel.findOne({ userID: userIdentity });

    if (!userProfile) {
      return res.status(404).json({ message: "User profile not found." });
    }

    // Update profile fields with new data
    userProfile.firstName = req.body.firstName || userProfile.firstName;
    userProfile.lastName = req.body.lastName || userProfile.lastName;
    userProfile.dateOfBirth = req.body.dateOfBirth || userProfile.dateOfBirth;
    userProfile.phoneNumber = req.body.phoneNumber || userProfile.phoneNumber;
    userProfile.gender = req.body.gender || userProfile.gender;
    userProfile.bio = req.body.bio || userProfile.bio;
    userProfile.address = req.body.address || userProfile.address;
    userProfile.location = req.body.location || userProfile.location;
    userProfile.avatar = req.body.avatar || userProfile.avatar;

    // Save the updated profile
    await userProfile.save();

    // Return success response
    res.status(200).json({
      message: "User profile updated successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "An unexpected error occurred while processing your request.",
    });
  }
};

