// Required Package
const mongoose = require("mongoose");

// Conversation Schema
const conversationSchema = new mongoose.Schema({
  userId: String,
  messages: [
    {
      sender: String,
      text: String,
      timestamp: Date,
    },
  ],
});

// Exporting Conversation Model
const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = Conversation;
