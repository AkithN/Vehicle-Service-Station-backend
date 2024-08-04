// routes/roleRoutes.js
const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/rolesController');

// Get all roles
router.get('/', RolesController.getAllRoles);

// Get role by ID
router.get('/:roleId', RolesController.getRoleById);

// Add a new role
router.post('/', RolesController.addRole);

// Update an existing role
router.put('/:roleId', RolesController.updateRole);

// Delete a role
router.delete('/:roleId', RolesController.deleteRole);

module.exports = router;
