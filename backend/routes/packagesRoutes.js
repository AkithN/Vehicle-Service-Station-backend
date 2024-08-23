const express = require('express');
const multer = require('multer');
const path = require('path');
const PackageModel = require('../models/packagesModel');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');  // Ensure the 'uploads' directory exists
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Create a new package
router.post('/', upload.single('packageImage'), async (req, res) => {
  try {
    // Log the uploaded file to verify it's being received
    if (req.file) console.log('Uploaded file:', req.file);

    const packageData = {
      ...req.body,
      packageImage: req.file ? `/uploads/${req.file.filename}` : null  // Save the file path
    };
    const newPackage = await PackageModel.addPackage(packageData);
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    console.error('Error in POST /api/packages:', error.message);
    res.status(500).json({ error: 'Error adding package' });
  }
});

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await PackageModel.getAllPackages();
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error retrieving packages:', error);
    res.status(500).json({ error: 'Error retrieving packages' });
  }
});

// Get package by ID
router.get('/:packageId', async (req, res) => {
  try {
    const package = await PackageModel.getPackageById(req.params.packageId);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.status(200).json(package);
  } catch (error) {
    console.error('Error retrieving package by ID:', error);
    res.status(500).json({ error: 'Error retrieving package' });
  }
});

// Update a package
router.put('/:packageId', upload.single('packageImage'), async (req, res) => {
  try {
    const existingPackage = await PackageModel.getPackageById(req.params.packageId);
    if (!existingPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }

    const packageData = {
      ...req.body,
      packageImage: req.file ? `/uploads/${req.file.filename}` : existingPackage.packageImage
    };
    const updatedPackage = await PackageModel.updatePackage(req.params.packageId, packageData);
    res.status(200).json(updatedPackage);
  } catch (error) {
    console.error('Error updating package:', error);
    res.status(500).json({ error: 'Error updating package' });
  }
});

// Delete a package
router.delete('/:packageId', async (req, res) => {
  try {
    const existingPackage = await PackageModel.getPackageById(req.params.packageId);
    if (!existingPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    await PackageModel.deletePackage(req.params.packageId);
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    console.error('Error deleting package:', error);
    res.status(500).json({ error: 'Error deleting package' });
  }
});

module.exports = router;
