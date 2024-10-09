const Faqs = require("../models/faqs");

// ADD FAQS
exports.addFaqs = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // VALIDATE
    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Both question and answer are required" });
    }

    // CHECK IF FAQ ALREADY EXISTS
    const existingFaq = await Faqs.findOne({ question });
    if (existingFaq) {
      return res.status(400).json({ message: "FAQ already exists" });
    }

    // CREATE NEW FAQ
    const newFaq = new Faqs({
      question,
      answer,
    });

    await newFaq.save();

    res.status(201).json({ message: "FAQ added successfully", faq: newFaq });
  } catch (error) {
    console.error("Error adding FAQ: ", error);
    res.status(400).json({
      message: "An error occured when trying to process the FAQ",
      error,
    });
  }
};

// GET ALL FAQS
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faqs.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs: ", error);
    res.status(400).json({
      message: "An error occured when trying to fetch FAQs",
      error,
    });
  }
};

// UPDATE FAQ
exports.updateFaq = async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer } = req.body;

    // VALIDATE
    if (!question || !answer) {
      return res
        .status(400)
        .json({ message: "Both question and answer are required" });
    }

    // CHECK IF FAQ EXISTS
    const existingFaq = await Faqs.findById(id);
    if (!existingFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // UPDATE FAQ
    existingFaq.question = question;
    existingFaq.answer = answer;
    await existingFaq.save();

    res
      .status(200)
      .json({ message: "FAQ updated successfully", faq: existingFaq });
  } catch (error) {
    console.error("Error updating FAQ: ", error);
    res.status(400).json({
      message: "An error occured when trying to update the FAQ",
      error,
    });
  }
};

// DELETE FAQ

exports.deleteFaq = async (req, res) => {
  try {
    const { id } = req.params;

    // CHECK IF FAQ EXISTS
    const existingFaq = await Faqs.findById(id);
    if (!existingFaq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await existingFaq.remove();

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ: ", error);
    res.status(400).json({
      message: "An error occured when trying to delete the FAQ",
      error,
    });
  }
};
