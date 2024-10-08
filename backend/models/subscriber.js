const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SUBSCRIBER SCHEMA
const SubscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// EXPORTING SUBSCRIBER MODEL
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
