const express = require('express');
const router = express.Router();

const faqsController = require('../controllers/faqs');

// ROUTES
router.get('/all', faqsController.getAllFaqs);
router.post('/new', faqsController.addFaqs);
router.put('/:id', faqsController.updateFaq);
router.delete('/:id', faqsController.deleteFaq);

module.exports = router;