const express = require('express');
const multer = require('multer');
const GarageModel = require('../models/garageModel');

const router = express.Router();

// Configure Multer to handle image uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit per file
}).fields([{ name: 'image1' }, { name: 'image2' }, { name: 'image3' }]);

// Route to register a new garage
router.post('/', (req, res) => {
    console.log("Register route hit");
    upload(req, res, async (uploadError) => {
        if (uploadError) {
            console.error('File upload error:', uploadError.message);
            return res.status(400).json({ error: 'File upload failed' });
        }

        try {
            const data = req.body;
            const images = [
                req.files['image1'] ? req.files['image1'][0].buffer.toString('base64') : null,
                req.files['image2'] ? req.files['image2'][0].buffer.toString('base64') : null,
                req.files['image3'] ? req.files['image3'][0].buffer.toString('base64') : null,
            ];

            await GarageModel.registerGarage(data, images);

            res.status(201).json({ message: 'Garage registered successfully!' });
        } catch (error) {
            console.error('Error registering garage:', error.message);
            res.status(500).json({ error: 'Failed to register garage' });
        }
    });
});

module.exports = router;
