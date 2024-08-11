const db = require('../config/db');

class UserManagement {
  static async getAllUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async getUserById(id) {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async addUser(user) {
    const { fullName, userType, email, password } = user;
    await db.query('INSERT INTO users (fullName, userType, email, password) VALUES (?, ?, ?, ?)', [fullName, userType, email, password]);
    return user;
  }

  static async updateUser(user) {
    const { id, fullName, userType, email } = user;
    await db.query('UPDATE users SET fullName = ?, userType = ?, email = ? WHERE id = ?', [fullName, userType, email, id]);
    return user;
  }

  static async deleteUser(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserManagement;
