// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const ContactModel = require('../models/contactModel'); // Make sure this path is correct

// POST /api/contactus/contact
router.post('/', async (req, res, next) => {
  try {
    const contactData = req.body;
    const result = await ContactModel.addContact(contactData);
    res.status(201).json({ message: 'Contact message saved successfully', result });
  } catch (err) {
    next(err); // Pass errors to the error handling middleware
  }
});

module.exports = router;
