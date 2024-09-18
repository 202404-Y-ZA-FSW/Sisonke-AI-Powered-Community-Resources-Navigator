const botModel = require('../models/chatbot');
const axios = require('axios'); 

const chat = async (req, res) => {
  try {
    const userId = req.user._id; 
    const userMessage = req.body.message;

    // 1. Send user message to FastAPI chatbot
    const fastApiResponse = await axios.post('  https://1c78-165-16-180-186.ngrok-free.app', {
      message: userMessage,
    });

    const botResponse = fastApiResponse.data.message; 

    // 2. Store the interaction in your database
    const newConversation = new botModel({
      userId,
      messages: [
        { sender: 'user', content: userMessage },
        { sender: 'bot', content: botResponse },
      ],
    });

    await newConversation.save();

    res.json({ message: botResponse });
  } catch (error) {
   //console.error('Error interacting with chatbot:', error);
    res.status(500).json({message:error.message});
  }
};

module.exports = { chat };
