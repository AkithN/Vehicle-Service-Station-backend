const db = require('../config/db');

class inquiriesModel {
  static async getAllInquiries() {
    const [rows] = await db.query('SELECT * FROM inquiries');
    return rows;
  }

  static async createInquiry(data) {
    const query = `
      INSERT INTO inquiries (name, phoneNumber, vehicleType, vehicleNumber, services, selectDate, selectTime, additionalServices)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.name,
      data.phoneNumber,
      data.vehicleType,
      data.vehicleNumber,
      data.services.join(', '),
      data.selectDate,
      data.selectTime,
      data.additionalServices || null,
    ];
    await db.query(query, values);
  }
}

module.exports = inquiriesModel;
