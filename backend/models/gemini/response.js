// Required Package
const mongoose = require("mongoose");

// Gemini Response Schema
const geminiResponseSchema = new mongoose.Schema({
  response: String,
  timestamp: Date,
});

// Exporting Gemini Response Model
const GeminiResponse = mongoose.model("GeminiResponse", geminiResponseSchema);
module.exports = GeminiResponse;
