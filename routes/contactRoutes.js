const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

/**
 * @route   POST /api/contact
 * @desc    Submit a contact inquiry message
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }

    const newMessage = await Contact.create({
      name,
      email,
      subject: subject || "General Inquiry",
      message
    });

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully. We will contact you soon.",
      data: newMessage
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /api/contact
 * @desc    Get all contact messages (Admin)
 */
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
