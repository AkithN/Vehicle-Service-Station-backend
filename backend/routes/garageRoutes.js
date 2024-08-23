const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const GarageModel = require('../models/garageModel');

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Create a new garage
router.post('/', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
  try {
    console.log('Uploaded files:', req.files); // Log uploaded files to verify

    const garageData = {
      ...req.body,
      image1: req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : null,
      image2: req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : null,
      image3: req.files['image3'] ? `/uploads/${req.files['image3'][0].filename}` : null,
    };

    console.log('Garage Data:', garageData); // Log garage data to verify

    const newGarage = await GarageModel.addGarage(garageData);
    res.status(201).json({ message: 'Garage registered successfully', garage: newGarage });
  } catch (error) {
    console.error('Error in POST /api/garages:', error.message);
    res.status(500).json({ error: 'Error registering garage' });
  }
});


// Get all garages
router.get('/', async (req, res) => {
  try {
    const garages = await GarageModel.getAllGarages();
    res.status(200).json(garages);
  } catch (error) {
    console.error('Error retrieving garages:', error);
    res.status(500).json({ error: 'Error retrieving garages' });
  }
});

// Get garage by ID
router.get('/:garageId', async (req, res) => {
  try {
    const garage = await GarageModel.getGarageById(req.params.garageId);
    if (!garage) {
      return res.status(404).json({ error: 'Garage not found' });
    }
    res.status(200).json(garage);
  } catch (error) {
    console.error('Error retrieving garage by ID:', error);
    res.status(500).json({ error: 'Error retrieving garage' });
  }
});

// Update a garage
router.put('/:garageId', upload.fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]), async (req, res) => {
  try {
    const existingGarage = await GarageModel.getGarageById(req.params.garageId);
    if (!existingGarage) {
      return res.status(404).json({ error: 'Garage not found' });
    }

    const garageData = {
      ...req.body,
      image1: req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : existingGarage.image1,
      image2: req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : existingGarage.image2,
      image3: req.files['image3'] ? `/uploads/${req.files['image3'][0].filename}` : existingGarage.image3,
    };

    const updatedGarage = await GarageModel.updateGarage(req.params.garageId, garageData);
    res.status(200).json({ message: 'Garage updated successfully', garage: updatedGarage });
  } catch (error) {
    console.error('Error updating garage:', error);
    res.status(500).json({ error: 'Error updating garage' });
  }
});

// Delete a garage
router.delete('/:garageId', async (req, res) => {
  try {
    const existingGarage = await GarageModel.getGarageById(req.params.garageId);
    if (!existingGarage) {
      return res.status(404).json({ error: 'Garage not found' });
    }
    await GarageModel.deleteGarage(req.params.garageId);
    res.status(200).json({ message: 'Garage deleted successfully' });
  } catch (error) {
    console.error('Error deleting garage:', error);
    res.status(500).json({ error: 'Error deleting garage' });
  }
});

module.exports = router;
