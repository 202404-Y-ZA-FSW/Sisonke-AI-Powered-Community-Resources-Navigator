// REQUIRED PACKAGE
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
//const { redirect } = require("next/navigation");
const userProfileModel = require("../../models/user/userProfile");


// REQUIRED MODELS
const userModel = require("../../models/user/user");

// REGISTER CONTROLLER
exports.register = async (req, res) => {
  // INPUT VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // CHECK USERNAME IS AVAILABLE
    const existingUsername = await userModel.findOne({
      username,
    });
    if (existingUsername) {
      return res.status(400).json({
        message: `This username "${username}" is already in use please try a different one`,
      });
    }

    // CHECK IF EMAIL IS NOT ALREADY SIGNED UP
    const existingEmail = await userModel.findOne({
      email,
    });
    if (existingEmail) {
      return res.status(400).json({
        message: `This email "${email}" has already registred please login or use a different email`,
      });
    }

    // HASH PASSWORD
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // CREATE NEW ADMINISTRATOR
    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: newUser._id,
        status: newUser.status,
        verified: newUser.verified,
        role:
          newUser.role === "user"
            ? "user"
            : newUser.role === "administrator"
            ? "administrator"
            : "ngo",
      },
      "This is the secret of the 21st century",
      { expiresIn: "1h" }
    );

    // RESPONSE
    res.status(201).json({
      message: "Your account has been created successfully",
      token,

      // TO BE REMOVED
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "An unexpected error has occured while trying to process your request",
    });
  }
};

exports.getUsers = async(req,res)=>{
  try{
    const users = await userModel.find();
    if(!users){
      return res.status(404).json({message:"No users found"});
    }

    res.status(200).json({users});
  }catch(err){
    res.status(500).json({message:"An unexpected error has occured. Please try again later."})
  }
}

// LOGIN
exports.login = async (req, res) => {
  // INPUT VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;

    // CHECK IF EMAIL EXISTS
    const existingUser = await userModel.findOne({
      username,
    });
    if (!existingUser) {
      return res.status(400).json({
        message: `A user with this username "${username}" does not exist`,
      });
    }

    // CHECK PASSWORD
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return console.error("Incorrect password");
    }

    // IF PASSWORD IS CORRECT
    if (isPasswordCorrect) {
      // JWT TOKEN
      const token = jwt.sign(
        {
          id: existingUser._id,
          status: existingUser.status,
          verified: existingUser.verified,
          role:
            existingUser.role === "user"
              ? "user"
              : existingUser.role === "administrator"
              ? "administrator"
              : "ngo",
        },
        "This is the secret of the 21st century",
        { expiresIn: "1h" }
      );

      // RESPONSE
      console.log(token);
      res.cookie("token", token, { httpOnly: true });
      res.status(200).json({
        message: "User signed in successfully",
        token,

        // TO BE REMOVED
        user: existingUser,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "An unexpected error has occured while trying to process your request",
    });
  }
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  // INPUT VALIDATION
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    // EXTRACT USER ID FROM JWT TOKEN
    const userIdentity = req.userID;

    // VERIFY USER ID IF IT EXISTS
    const user = await userModel.findById(userIdentity);

    if (!user) {
      return res.status(401).json({ message: "Incorrect user identity" });
    }

    const { currentPassword, newPassword } = req.body;

    // VERIFY IF CURRENT PASSWORD MATCHES STORED PASSWORD
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // CHECK IF NEW PASSWORD IS SAME AS CURRENT PASSWORD
    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({
          message: "New password cannot be the same as the current password",
        });
    }

    // HASH NEW PASSWORD
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // UPDATE PASSWORD
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "An unexpected error occurred while processing your request",
    });
  }
};

// FORGOT PASSWORD

// VERIFY EMAIL

// CURRENTLY LOGGED IN USER
exports.currentUser = async (req, res) => {
  try {
    // EXTRACT USER ID FROM JWT TOKEN
    const userIdentity = req.userID;

    // VERIFY USER ID IF IT EXISTS
    const user = await userModel.findById(userIdentity);

    if (!user) {
      return res.status(401).json({ message: "Incorrect user identity" });
    }

    if (user) {
      return res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status,
          verified: user.verified,
        },
      });
    } else {
      // USER NOT FOUND
      return res.status(403).json({
        message:
          "Access forbidden: You are not authorized to perform this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "An unexpected error has occured while trying to process your request",
    });
  }
};

// LOGOUT
exports.logout = async (req, res) => {
  try {
    // EXTRACT USER ID FROM JWT TOKEN
    const userIdentity = req.userID;

    // VERIFY USER ID IF IT EXISTS
    const user = await userModel.findById(userIdentity);

    if (!user) {
      return res.status(401).json({ message: "Incorrect user identity" });
    }

    // IF USER EXISTS, CLEAR THE JWT TOKEN AND RESPONSE
    if (user) {
      res.clearCookie("token", {
        httpOnly: true,
      });

      return res.status(200).json({ message: "User signed out successfully" });
    } else {
      // USER NOT FOUND
      return res.status(403).json({
        message:
          "Access forbidden: You are not authorized to perform this action",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message:
        "An unexpected error has occured while trying to process your request",
    });
  }
};


exports.fetchUsers = async (req, res) => {
  try{
    const users = await userModel.find();
    if(!users) return res.status(404).json("No users found")
    res.status(200).json(users);
    
  }catch(err){
    res.status(500).json("Server Error. Please try again later.")
  }
}

exports.remove = async (req, res) => {
  try {
    const userId = req.body.userId; // Extract userId from the request body
    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found, please check the user details and try again" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "An unexpected error has occurred. Please try again later." });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const userId = req.body.userId; // Getting the userId from the body
    const { status, role } = req.body; // Extracting status and role from the body as well

    const user = await userModel.findByIdAndUpdate(userId, { status, role }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "User not found, please check the user details and try again" });
    }

    res.status(200).json({ message: "User status updated successfully", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};
