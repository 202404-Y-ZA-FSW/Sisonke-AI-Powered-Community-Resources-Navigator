const express = require('express');
const sendEmail = require('../utils/mailer'); 

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;
