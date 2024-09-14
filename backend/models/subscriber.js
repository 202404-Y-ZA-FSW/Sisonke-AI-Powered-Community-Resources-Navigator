const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// SUBSCRIBER SCHEMA
const SubscriberSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// EXPORTING SUBSCRIBER MODEL
const Subscriber = mongoose.model("Subscriber", SubscriberSchema);
module.exports = Subscriber;
