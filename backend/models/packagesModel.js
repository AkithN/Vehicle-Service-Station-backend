const db = require('../config/db');

class PackageModel {
  static async addPackage(packageData) {
    try {
      const { packageName, packageDescription, price, packageImage } = packageData;
      const query = 'INSERT INTO packages (packageName, packageDescription, price, packageImage) VALUES (?, ?, ?, ?)';
      const [result] = await db.query(query, [packageName, packageDescription, price, packageImage]);
      return { packageId: result.insertId, ...packageData };
    } catch (error) {
      console.error('Database insert error:', error);  // Added better logging
      throw error;  // Throw error to be caught by the controller
    }
  }

  static async getAllPackages() {
    const query = 'SELECT * FROM packages';
    const [rows] = await db.query(query);
    return rows;
  }

  static async getPackageById(packageId) {
    const query = 'SELECT * FROM packages WHERE packageId = ?';
    const [rows] = await db.query(query, [packageId]);
    return rows[0];
  }

  static async updatePackage(packageId, packageData) {
    const { packageName, packageDescription, price, packageImage } = packageData;
    const query = 'UPDATE packages SET packageName = ?, packageDescription = ?, price = ?, packageImage = ? WHERE packageId = ?';
    await db.query(query, [packageName, packageDescription, price, packageImage, packageId]);
    return packageData;
  }

  static async deletePackage(packageId) {
    const query = 'DELETE FROM packages WHERE packageId = ?';
    await db.query(query, [packageId]);
  }
}

module.exports = PackageModel;
