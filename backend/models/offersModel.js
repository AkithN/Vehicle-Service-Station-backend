const db = require('../config/db');

class OfferModel {
  static async addOffer(offerData) {
    const { offerName, offerDescription, expiredate, imageName } = offerData;
    const query = 'INSERT INTO offers (offerName, offerDescription, expiredate, imageName) VALUES (?, ?, ?, ?)';
    await db.query(query, [offerName, offerDescription, expiredate, imageName]);
    return offerData;
  }

  static async getAllOffers() {
    const query = 'SELECT * FROM offers';
    const [rows] = await db.query(query);
    return rows;
  }

  static async getOfferById(offerId) {
    const query = 'SELECT * FROM offers WHERE offerId = ?';
    const [rows] = await db.query(query, [offerId]);
    return rows[0];
  }

  static async updateOffer(offerId, offerData) {
    const { offerName, offerDescription, expiredate, imageName } = offerData;
    const query = 'UPDATE offers SET offerName = ?, offerDescription = ?, expiredate = ?, imageName = ? WHERE offerId = ?';
    await db.query(query, [offerName, offerDescription, expiredate, imageName, offerId]);
    return offerData;
  }

  static async deleteOffer(offerId) {
    const query = 'DELETE FROM offers WHERE offerId = ?';
    await db.query(query, [offerId]);
  }
}

module.exports = OfferModel;
