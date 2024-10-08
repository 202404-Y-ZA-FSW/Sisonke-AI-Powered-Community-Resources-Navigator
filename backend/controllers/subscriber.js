// subscriberController.js (Controller)

const { validationResult } = require("express-validator");
const subscriberModel = require("../models/subscriber");

// NEW SUBSCRIBER CONTROLLER
exports.newSubscriber = async (req, res) => {
  // INPUT VALIDATION
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { name, email, location } = req.body; // Capture all fields

    // CHECK IF SUBSCRIBER ALREADY EXISTS
    const existingSubscriber = await subscriberModel.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "This email has already subscribed" });
    }

    // CREATE NEW SUBSCRIBER
    const newSubscriber = new subscriberModel({ name, email, location }); // Include name and location
    await newSubscriber.save();

    res.status(201).json({ message: "You have subscribed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occurred while trying to process your request" });
  }
};

// GET ALL SUBSCRIBERS CONTROLLER
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await subscriberModel.find();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occurred while trying to process your request" });
  }
};

// UNSUBSCRIBE CONTROLLER
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // CHECK IF SUBSCRIBER EXISTS
    const existingSubscriber = await subscriberModel.findOne({ email });
    if (!existingSubscriber) {
      return res.status(400).json({ error: "This email has not subscribed to our newsletter" });
    }

    // REMOVE SUBSCRIBER
    await subscriberModel.deleteOne({ email });

    res.status(200).json({ message: "You have unsubscribed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An unexpected error has occurred while trying to process your request" });
  }
};
