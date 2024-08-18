// models/Contact.js
const db = require('../config/db');

class ContactModel {
  static async addContact(contact) {
    const { user_name, user_email, message } = contact;
    const [result] = await db.query('INSERT INTO contactus (user_name, user_email, message) VALUES (?, ?, ?)', [user_name, user_email, message]);
    return { id: result.insertId, ...contact };
  }
}

module.exports = ContactModel;
