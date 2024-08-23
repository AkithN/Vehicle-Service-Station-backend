const db = require('../config/db');

class GarageModel {
  static async addGarage(garageData) {
    try {
      const { garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale, website, facebook, instagram, twitter, image1, image2, image3 } = garageData;
      const query = `INSERT INTO garages (garageName, garageAddress, district, province, workNum, mobileNum, services, 
                        garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, 
                        serviceScale, website, facebook, instagram, twitter, image1, image2, image3) 
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.query(query, [garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale, website, facebook, instagram, twitter, image1, image2, image3]);
      return { garageId: result.insertId, ...garageData };
    } catch (error) {
      console.error('Database insert error:', error);
      throw error;
    }
  }

  static async getAllGarages() {
    const query = 'SELECT * FROM garages';
    const [rows] = await db.query(query);
    return rows;
  }

  static async getGarageById(garageId) {
    const query = 'SELECT * FROM garages WHERE garageId = ?';
    const [rows] = await db.query(query, [garageId]);
    return rows[0];
  }

  static async updateGarage(garageId, garageData) {
    const { garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale, website, facebook, instagram, twitter, image1, image2, image3 } = garageData;
    const query = `UPDATE garages SET garageName = ?, garageAddress = ?, district = ?, province = ?, workNum = ?, mobileNum = ?, 
                  services = ?, garageDescription = ?, operatingHoursWeek = ?, operatingHoursWeekend = ?, publicHoliday = ?, 
                  emergencyService = ?, serviceScale = ?, website = ?, facebook = ?, instagram = ?, twitter = ?, 
                  image1 = ?, image2 = ?, image3 = ? WHERE garageId = ?`;
    await db.query(query, [garageName, garageAddress, district, province, workNum, mobileNum, services, garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService, serviceScale, website, facebook, instagram, twitter, image1, image2, image3, garageId]);
    return garageData;
  }

  static async deleteGarage(garageId) {
    const query = 'DELETE FROM garages WHERE garageId = ?';
    await db.query(query, [garageId]);
  }
}

module.exports = GarageModel;
