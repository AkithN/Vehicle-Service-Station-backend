// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// User signup
router.post('/signup', AuthController.signup);

// User login
router.post('/login', AuthController.login);

module.exports = router;
