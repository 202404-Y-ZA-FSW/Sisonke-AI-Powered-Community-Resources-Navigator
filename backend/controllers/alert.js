const Alert = require("../models/alert");

// Create a new alert
const createAlert = async (req, res) => {
  try {
    const { title, message, Type, location, expiresAt } = req.body;

    const newAlert = new Alert({
      title,
      message,
      Type,
      location,
      expiresAt,
    });

    await newAlert.save();
    res.status(201).json(newAlert);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error creating alert", message: err.message });
  }
};

// Get all alerts
const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching alerts", message: err.message });
  }
};

// Get a single alert by ID
const getAlertById = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({ error: "Alert not found" });
    }
    res.status(200).json(alert);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error fetching alert", message: err.message });
  }
};

// Update an alert by ID
const updateAlert = async (req, res) => {
  try {
    const { title, message, Type, location, expiresAt } = req.body;
    const updatedAlert = await Alert.findByIdAndUpdate(
      req.params.id,
      { title, message, Type, location, expiresAt },
      { new: true, runValidators: true }
    );
    if (!updatedAlert) {
      return res.status(404).json({ error: "Alert not found" });
    }
    res.status(200).json(updatedAlert);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error updating alert", message: err.message });
  }
};

// Delete an alert by ID
const deleteAlert = async (req, res) => {
  try {
    const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
    if (!deletedAlert) {
      return res.status(404).json({ error: "Alert not found" });
    }
    res.status(200).json({ message: "Alert deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error deleting alert", message: err.message });
  }
};

module.exports = {
  createAlert,
  getAllAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
};
