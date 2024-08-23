const express = require('express');
const multer = require('multer');
const path = require('path');
const OfferModel = require('../models/offersModel');

const router = express.Router();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
  },
});

const upload = multer({ storage: storage });

// Create a new offer
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const imageName = req.file ? req.file.filename : null;
    const newOffer = await OfferModel.addOffer({ ...req.body, imageName });
    res.status(201).json({ message: 'Offer created successfully', offer: newOffer });
  } catch (error) {
    console.error('Error adding offer:', error);
    res.status(500).json({ error: 'Error adding offer' });
  }
});

// Get all offers
router.get('/', async (req, res) => {
  try {
    const offers = await OfferModel.getAllOffers();
    res.status(200).json(offers);
  } catch (error) {
    console.error('Error retrieving offers:', error);
    res.status(500).json({ error: 'Error retrieving offers' });
  }
});

// Get offer by ID
router.get('/:offerId', async (req, res) => {
  try {
    const offer = await OfferModel.getOfferById(req.params.offerId);
    if (!offer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    res.status(200).json(offer);
  } catch (error) {
    console.error('Error retrieving offer by ID:', error);
    res.status(500).json({ error: 'Error retrieving offer' });
  }
});

// Update an offer
router.put('/:offerId', upload.single('image'), async (req, res) => {
  try {
    const existingOffer = await OfferModel.getOfferById(req.params.offerId);
    if (!existingOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    const imageName = req.file ? req.file.filename : existingOffer.imageName;
    const updatedOffer = await OfferModel.updateOffer(req.params.offerId, { ...req.body, imageName });
    res.status(200).json(updatedOffer);
  } catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ error: 'Error updating offer' });
  }
});

// Delete an offer
router.delete('/:offerId', async (req, res) => {
  try {
    const existingOffer = await OfferModel.getOfferById(req.params.offerId);
    if (!existingOffer) {
      return res.status(404).json({ error: 'Offer not found' });
    }
    await OfferModel.deleteOffer(req.params.offerId);
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    console.error('Error deleting offer:', error);
    res.status(500).json({ error: 'Error deleting offer' });
  }
});

module.exports = router;
