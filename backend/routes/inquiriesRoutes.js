// const express = require('express');
// const router = express.Router();
// const inquiriesModel = require('../models/inquiriesModel');

// router.get('/', async (req, res) => {
//   try {
//     const inquiries = await inquiriesModel.getAllInquiries();
//     res.status(200).json(inquiries);
//   } catch (error) {
//     res.status(500).json({ error: 'Error retrieving inquiries' });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const { name, phoneNumber, vehicleType, vehicleNumber, services, selectDate, selectTime, additionalServices } = req.body;
//     const result = await inquiriesModel.createInquiry(name, phoneNumber, vehicleType, vehicleNumber, services, selectDate, selectTime, additionalServices);
//     res.status(201).json({ message: 'Inquiry created successfully', inquiryId: result.insertId });
//   } catch (error) {
//     console.error('Error creating inquiry:', error);
//     res.status(500).json({ error: 'Error creating inquiry' });
//   }
// });


// module.exports = router;


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

router.post('/', async (req, res) => {
  try {
    const inquiryData = req.body;
    const result = await inquiriesModel.createInquiry(inquiryData);
    res.status(201).json({ message: 'Inquiry created successfully', inquiryId: result.insertId });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Error creating inquiry' });
  }
});

module.exports = router;
