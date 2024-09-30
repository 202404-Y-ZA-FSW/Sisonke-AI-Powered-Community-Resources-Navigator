const express = require('express');
const conversationController = require('../controllers/gemini/conversation');

const router = express.Router();

router.get('/conversations', conversationController.getConversations);
router.post('/new', conversationController.createConversation);
router.post('/:conversationId/messages', conversationController.addMessage);

module.exports = router;