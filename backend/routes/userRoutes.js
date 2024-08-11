const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

// Get all users
router.get('/', UsersController.getAllUsers);

// Get user by ID
router.get('/:id', UsersController.getUserById);

// Add a new user
router.post('/', UsersController.addUser);

// Update an existing user
router.put('/:id', UsersController.updateUser);

// Delete a user
router.delete('/:id', UsersController.deleteUser);

module.exports = router;
