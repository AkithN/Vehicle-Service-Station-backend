const db = require('../config/db');

class GarageModel {
  static async addGarage(garageData) {
    try {
      const {
        garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription,
        operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale,
        website, facebook, instagram, twitter, image1, image2, image3
      } = garageData;

      const query = `INSERT INTO garages (garageName, garageAddress, district, province, workNum, mobileNum, services,
        garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale,
        website, facebook, instagram, twitter, image1, image2, image3)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const [result] = await db.query(query, [
        garageName, garageAddress, district, province, workNum, mobileNum, services,
        garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale,
        website, facebook, instagram, twitter, image1, image2, image3
      ]);

      return { garageId: result.insertId, ...garageData };
    } catch (error) {
      console.error('Database insert error:', error);
      throw error;
    }
  }

  static async searchGarages(searchInput, limit = 10, offset = 0) {
    try {
      const query = `
        SELECT SQL_CALC_FOUND_ROWS * FROM garages 
        WHERE garageName LIKE ? OR district LIKE ? OR province LIKE ?
        ORDER BY garageName ASC
        LIMIT ? OFFSET ?
      `;
      const values = [
        `%${searchInput}%`,
        `%${searchInput}%`,
        `%${searchInput}%`,
        Number(limit),
        Number(offset),
      ];
      const [rows] = await db.query(query, values);
      const [countResult] = await db.query('SELECT FOUND_ROWS() as total');
      const total = countResult[0].total;
      return { results: rows, total };
    } catch (error) {
      console.error('Database search error:', error);
      throw error;
    }
  }
  

  static async getAllGarages() {
    try {
      const query = 'SELECT * FROM garages';
      const [rows] = await db.query(query);
      return rows;
    } catch (error) {
      console.error('Database retrieval error:', error);
      throw error;
    }
  }

  static async getGarageById(garageId) {
    try {
      const query = 'SELECT * FROM garages WHERE garageId = ?';
      const [rows] = await db.query(query, [garageId]);
      return rows[0];
    } catch (error) {
      console.error('Database retrieval error:', error);
      throw error;
    }
  }

  static async updateGarage(garageId, garageData) {
    try {
      const {
        garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription,
        operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale,
        website, facebook, instagram, twitter, image1, image2, image3
      } = garageData;

      const query = `UPDATE garages SET garageName = ?, garageAddress = ?, district = ?, province = ?, workNum = ?, mobileNum = ?, 
                      services = ?, garageDescription = ?, operatingHoursWeek = ?, operatingHoursWeekend = ?, publicHoliday = ?, 
                      emergencyService = ?, serviceScale = ?, website = ?, facebook = ?, instagram = ?, twitter = ?, 
                      image1 = ?, image2 = ?, image3 = ? WHERE garageId = ?`;

      await db.query(query, [
        garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription,
        operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale,
        website, facebook, instagram, twitter, image1, image2, image3, garageId
      ]);

      return garageData;
    } catch (error) {
      console.error('Database update error:', error);
      throw error;
    }
  }

  static async deleteGarage(garageId) {
    try {
      const query = 'DELETE FROM garages WHERE garageId = ?';
      await db.query(query, [garageId]);
    } catch (error) {
      console.error('Database delete error:', error);
      throw error;
    }
  }
}

module.exports = GarageModel;
