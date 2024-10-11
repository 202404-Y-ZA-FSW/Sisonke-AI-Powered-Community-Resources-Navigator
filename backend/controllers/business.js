// REQUIRED PACKAGE
const { validationResult } = require("express-validator");

// BUSINESS MODEL
const businessModel = require("../models/business");

// NEW BUSINESS CONTROLLER
exports.newBusiness = async (req, res) => {
  // INPUT VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const userID = req.userID
    const { name, description, address, city, phone, email, website, category, image, logo,owner } = req.body;

    // CREATE NEW BUSINESS
    const newBusiness = new businessModel({
      name,
      description,
      address,
      city,
      phone,
      email,
      website,
      category,
      image,
      logo,
      owner: userID,

    });
    
    await newBusiness.save();

    res.status(201).json({ message: "Business registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error has occured while trying to process your request" });
  }
};

// GET ALL BUSINESS CONTROLLER
exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.find();
    res.status(200).json({ businesses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occured while trying to process your request" });
  }
};

// GET SINGLE BUSINESS CONTROLLER
exports.getBusiness = async (req, res) => {
  try {
    const { businessID } = req.params;
    const business = await businessModel.findById(businessID);
    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }
    res.status(200).json({ business });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occured while trying to process your request" });
  }
};

// UPDATE BUSINESS CONTROLLER
exports.updateBusiness = async (req, res) => {
  try {
    const { businessID } = req.params;
    const { name, description, address, city, phone, email, website, category, image, logo } = req.body;

    // UPDATE BUSINESS
    const updatedBusiness = await businessModel.findByIdAndUpdate(
      businessID,
      { name, description, address, city, phone, email, website, category, image, logo },
      { new: true }
    );
    if (!updatedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }
    res.status(200).json({ message: "Business updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occured while trying to process your request" });
  }
};

// DELETE BUSINESS CONTROLLER
exports.deleteBusiness = async (req, res) => {
  try {
    const { businessID } = req.params;
    const deletedBusiness = await businessModel.findByIdAndDelete(businessID);
    if (!deletedBusiness) {
      return res.status(404).json({ error: "Business not found" });
    }
    res.status(200).json({ message: "Business deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occured while trying to process your request" });
  }
};