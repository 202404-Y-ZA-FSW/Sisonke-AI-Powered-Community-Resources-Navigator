const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  messages: [{
    sender: {
      type: String,
      enum: ['user', 'bot'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  intent: {
    type: String,
    // You can define specific intents like 'greeting', 'search_resource', etc.
  },
  entities: {
    // Store extracted entities from user input
    type: Map,
    of: String
  },
  context: {
    // Store conversation context for multi-turn interactions
    type: Map,
    of: String
  }
}, { timestamps: true });

const Chatbot = mongoose.model('Chatbot', conversationSchema);

module.exports = Chatbot;
