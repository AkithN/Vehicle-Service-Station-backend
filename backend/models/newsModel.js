const db = require('../config/db');

class NewsModel {
  static async addNews({ topic, description, image }) {
    try {
      const sql = 'INSERT INTO news (topic, description, image) VALUES (?, ?, ?)';
      const [result] = await db.query(sql, [topic, description, image]);
      return { newsId: result.insertId, topic, description, image };
    } catch (err) {
      console.error('Database insert error:', err);
      throw err;
    }
  }

  static async getAllNews() {
    try {
      const sql = 'SELECT * FROM news';
      const [results] = await db.query(sql);
      return results;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }

  static async getNewsById(newsId) {
    try {
      const sql = 'SELECT * FROM news WHERE newsId = ?';
      const [results] = await db.query(sql, [newsId]);
      return results[0];
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }

  static async updateNews(newsId, { topic, description, image }) {
    try {
      const sql = `
        UPDATE news 
        SET topic = ?, description = ?, image = ? 
        WHERE newsId = ?
      `;
      await db.query(sql, [topic, description, image, newsId]);
      return { newsId, topic, description, image };
    } catch (err) {
      console.error('Database update error:', err);
      throw err;
    }
  }

  static async deleteNews(newsId) {
    try {
      const sql = 'DELETE FROM news WHERE newsId = ?';
      await db.query(sql, [newsId]);
    } catch (err) {
      console.error('Database delete error:', err);
      throw err;
    }
  }
}

module.exports = NewsModel;
