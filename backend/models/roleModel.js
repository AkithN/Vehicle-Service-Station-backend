// models/roleModel.js
const db = require('../config/db');

class RoleModel {
  static async getAllRoles() {
    const [rows] = await db.query('SELECT * FROM roles');
    return rows;
  }

  static async getRoleById(roleId) {
    const [rows] = await db.query('SELECT * FROM roles WHERE roleId = ?', [roleId]);
    return rows[0];
  }

  static async addRole(role) {
    const { roleId, roleName, status } = role;
    await db.query('INSERT INTO roles (roleId, roleName, status) VALUES (?, ?, ?)', [roleId, roleName, status]);
    return role;
  }

  static async updateRole(role) {
    const { roleId, roleName, status } = role;
    await db.query('UPDATE roles SET roleName = ?, status = ? WHERE roleId = ?', [roleName, status, roleId]);
    return role;
  }

  static async deleteRole(roleId) {
    await db.query('DELETE FROM roles WHERE roleId = ?', [roleId]);
  }
}

module.exports = RoleModel;
