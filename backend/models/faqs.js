const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// FAQs MODEL
const faqsSchema = new Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
        trim: true,
        minlength: [5, "Question must be at least 5 characters long"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"],
        trim: true,
        minlength: [5, "Answer must be at least 5 characters long"]
    }
});

const FAQs = mongoose.model('FAQs', faqsSchema);
module.exports = FAQs;