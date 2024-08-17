const express = require('express');
const router = express.Router();
const UserManagement = require('../models/userManagementModel');

// Get all users
router.get('/', async (req, res) => {
        try {
          const users = await UserManagement.getAllUsers();
          res.status(200).json(users);
        } catch (error) {
          console.error('Error retrieving users:', error);
          res.status(500).json({ error: 'Error retrieving users' });
        } 
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
      const user = await UserManagement.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error('Error retrieving user by ID:', error);
      res.status(500).json({ error: 'Error retrieving user' });
    }
  });

// Add a new user
router.post('/', async (req, res) => {
    try {
      const newUser = await UserManagement.addUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Error adding user' });
    }
  });

// Update an existing user
router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await UserManagement.updateUser({ id: req.params.id, ...req.body });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Error updating user' });
    }
  });

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
      await UserManagement.deleteUser(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Error deleting user' });
    }
  });

module.exports = router;
