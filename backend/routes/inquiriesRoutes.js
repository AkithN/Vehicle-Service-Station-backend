const express = require('express');
const router = express.Router();
const inquiriesModel = require('../models/inquiriesModel');

router.get('/', async (req, res) => {
  try {
      const inquiries = await inquiriesModel.getAllInquiries();
      res.status(200).json(inquiries);
  } catch (error) {
      res.status(500).json({ error: 'Error retrieving inquiries' });
  }
});

module.exports = router;