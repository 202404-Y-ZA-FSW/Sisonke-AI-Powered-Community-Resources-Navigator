const express = require('express');
const conversationController = require('../controllers/gemini/conversation');
const sisonke = require('../controllers/gemini/geminixsisonke');

const router = express.Router();

router.get('/conversations', conversationController.getConversations);
router.post('/new', conversationController.createConversation);
router.post('/:conversationId/messages', conversationController.addMessage);
router.post('/sisonke', sisonke.sisonkeAI);

module.exports = router;