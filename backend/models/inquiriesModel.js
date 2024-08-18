const db = require('../config/db');

class inquiriesModel {
  static async getAllInquiries() {
      const [rows] = await db.query('SELECT * FROM inquiries');
      return rows;
  }
}

module.exports = inquiriesModel;
