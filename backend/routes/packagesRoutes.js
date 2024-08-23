const express = require('express');
const router = express.Router();
const PackageModel = require('../models/packagesModel');

// Create a new package
router.post('/', async (req, res) => {
  try {
    const newPackage = await PackageModel.addPackage(req.body);
    res.status(201).json({ message: 'Package created successfully', package: newPackage });
  } catch (error) {
    console.error('Error adding package:', error);
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
router.put('/:packageId', async (req, res) => {
  try {
    const existingPackage = await PackageModel.getPackageById(req.params.packageId);
    if (!existingPackage) {
      return res.status(404).json({ error: 'Package not found' });
    }
    const updatedPackage = await PackageModel.updatePackage(req.params.packageId, req.body);
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
