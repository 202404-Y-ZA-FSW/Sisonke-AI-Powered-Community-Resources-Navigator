const Contact = require('../models/contact');

// Send a new  message
const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    return res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ message: 'Failed to send message.' });
  }
};

module.exports = {
  sendMessage,
};
