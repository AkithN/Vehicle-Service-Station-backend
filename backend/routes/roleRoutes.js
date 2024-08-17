// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const RoleModel = require('../models/roleModel')

// Get all roles
router.get('/', async (req, res) => {
        try {
          const roles = await RoleModel.getAllRoles();
          res.status(200).json(roles);
        } catch (error) {
          console.error('Error retrieving roles:', error); // Log detailed error
          res.status(500).json({ error: 'Error retrieving roles' });
        }
      
});

// Get role by ID
router.get('/:roleId', async (req, res) => {
    try {
      const role = await RoleModel.getRoleById(req.params.roleId);
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
      res.status(200).json(role);
    } catch (error) {
      console.error('Error retrieving role by ID:', error); // Log detailed error
      res.status(500).json({ error: 'Error retrieving role' });
    }
  });

// Add a new role
router.post('/', async (req, res) => {
    try {
      const { roleId, roleName, status } = req.body;
      const existingRole = await RoleModel.getRoleById(roleId);
      if (existingRole) {
        return res.status(400).json({ error: 'Role ID already exists' });
      }
      const newRole = await RoleModel.addRole({ roleId, roleName, status });
      res.status(201).json(newRole);
    } catch (error) {
      console.error('Error adding role:', error); // Log detailed error
      res.status(500).json({ error: 'Error adding role' });
    }
  });

// Update an existing role
router.put('/:roleId', async (req, res) => {
    try {
        const { roleId } = req.params;
        const { roleName, status } = req.body;
        const existingRole = await RoleModel.getRoleById(roleId);
        if (!existingRole) {
          return res.status(404).json({ error: 'Role not found' });
        }
        const updatedRole = await RoleModel.updateRole({ roleId, roleName, status });
        res.status(200).json(updatedRole);
      } catch (error) {
        console.error('Error updating role:', error); // Log detailed error
        res.status(500).json({ error: 'Error updating role' });
      }
});

// Delete a role
router.delete('/:roleId', async (req, res) => {
    try {
      const { roleId } = req.params;
      const existingRole = await RoleModel.getRoleById(roleId);
      if (!existingRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
      await RoleModel.deleteRole(roleId);
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      console.error('Error deleting role:', error); // Log detailed error
      res.status(500).json({ error: 'Error deleting role' });
    }
  });

module.exports = router;
