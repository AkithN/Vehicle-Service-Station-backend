const db = require('../config/db');

class PackageModel {
  static async addPackage(packageData) {
    const { packageName, packageDescription, price } = packageData;
    const query = 'INSERT INTO packages (packageName, packageDescription, price) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [packageName, packageDescription, price]);
    return { packageId: result.insertId, ...packageData };
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
    const { packageName, packageDescription, price } = packageData;
    const query = 'UPDATE packages SET packageName = ?, packageDescription = ?, price = ? WHERE packageId = ?';
    await db.query(query, [packageName, packageDescription, price, packageId]);
    return packageData;
  }

  static async deletePackage(packageId) {
    const query = 'DELETE FROM packages WHERE packageId = ?';
    await db.query(query, [packageId]);
  }
}

module.exports = PackageModel;
