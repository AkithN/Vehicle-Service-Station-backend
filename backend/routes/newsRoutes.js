const express = require('express');
const multer = require('multer');
const path = require('path');
const NewsModel = require('../models/newsModel');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/news/'); // Define the destination folder for news images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
  },
});

const upload = multer({ storage: storage });

// Add News
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { topic, description } = req.body;
    const image = req.file ? `/uploads/news/${req.file.filename}` : null;

    const newNews = await NewsModel.addNews({ topic, description, image });
    res.status(201).json({ message: 'News added successfully', news: newNews });
  } catch (error) {
    console.error('Error in POST /api/news:', error.message);
    res.status(500).json({ error: 'Failed to add news' });
  }
});

// Get All News
router.get('/', async (req, res) => {
  try {
    const news = await NewsModel.getAllNews();
    res.status(200).json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get News by ID
router.get('/:newsId', async (req, res) => {
  try {
    const { newsId } = req.params;

    const newsItem = await NewsModel.getNewsById(newsId);
    if (!newsItem) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.status(200).json(newsItem);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Update News
router.put('/:newsId', upload.single('image'), async (req, res) => {
  try {
    const { newsId } = req.params;
    const existingNews = await NewsModel.getNewsById(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: 'News not found' });
    }

    const { topic, description } = req.body;
    const image = req.file ? `/uploads/news/${req.file.filename}` : existingNews.image;

    const updatedNews = await NewsModel.updateNews(newsId, { topic, description, image });
    res.status(200).json({ message: 'News updated successfully', news: updatedNews });
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ error: 'Failed to update news' });
  }
});

// Delete News
router.delete('/:newsId', async (req, res) => {
  try {
    const { newsId } = req.params;
    const existingNews = await NewsModel.getNewsById(newsId);
    if (!existingNews) {
      return res.status(404).json({ error: 'News not found' });
    }

    await NewsModel.deleteNews(newsId);
    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ error: 'Failed to delete news' });
  }
});

module.exports = router;
