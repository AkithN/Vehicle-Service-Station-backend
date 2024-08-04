// models/userModel.js
const db = require('../config/db');

class UserModel {
  static async getUserByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async addUser(user) {
    const { fullName, userType, email, password } = user;
    const result = await db.query('INSERT INTO users (fullName, userType, email, password) VALUES (?, ?, ?, ?)', [fullName, userType, email, password]);
    return { id: result.insertId, fullName, userType, email }; // Return the new user's ID
  }
}

module.exports = UserModel;
