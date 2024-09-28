const Conversation = require("../../models/gemini/conversation");
const GeminiResponse = require("../../models/gemini/response");

const API_KEY = "AIzaSyC9v1_1GY_ldbxS_ic1Ymnp5FHSFPJ8VnA"
const GeminiRestAPI = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const conversationController = {
  getConversations: async (req, res) => {
    const userID = "66f835b699453c114e5356d9";
    try {
      const conversations = await Conversation.find({ userId: userID });
      res.json(conversations);
    } catch (err) {
      res.status(500).json({ error: "Error fetching conversations" });
    }
  },
  createConversation: async (req, res) => {
    const userID = "66f835b699453c114e5356d9";
    try {
      const newConversation = new Conversation({ userId: userID });
      await newConversation.save();
      res.json(newConversation);
    } catch (err) {
      res.status(500).json({ error: "Error creating conversation" });
    }
  },
  addMessage: async (req, res) => {
    try {
      if (!req.body.message || req.body.message.trim() === '') {
        return res.status(400).json({ error: "Message is required" });
      }
  
      const conversation = await Conversation.findById(req.params.conversationId);
  
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
  
      conversation.messages.push({
        sender: "user",
        text: req.body.message,
        timestamp: new Date(),
      });
  
      const geminiResponse = await fetch(GeminiRestAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: req.body.message,
                },
              ],
            },
          ],
        }),
      });
  
      if (!geminiResponse.ok) {
        throw new Error(`Gemini API responded with status ${geminiResponse.status}`);
      }
  
      const responseData = await geminiResponse.json();
      const geminiResponseText = responseData.candidates[0].content.parts[0].text;
  
      const [savedConversation, savedGeminiResponse] = await Promise.all([
        conversation.save(),
        new GeminiResponse({
          response: geminiResponseText,
          timestamp: new Date(),
        }).save(),
      ]);
  
      savedConversation.messages.push({
        sender: "Gemini",
        text: geminiResponseText,
        timestamp: new Date(),
      });
      await savedConversation.save();
  
      res.json(savedConversation);
    } catch (err) {
      console.error("Error in addMessage:", err);
      res.status(500).json({ error: "Error adding message", details: err.message });
    }
  },
};

module.exports = conversationController;
