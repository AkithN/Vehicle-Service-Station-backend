// const pool = require('../config/db');

// class GarageModel {
//     // Method to register a new garage
//     static async registerGarage(data, images) {
//         const {
//             username, address, district, province, contact, contact1, services,
//             description, time, wtime, ptime, etime, scale, website,
//             facebook, instagram, twitter
//         } = data;

//         const [image1, image2, image3] = images;

//         const sql = `
//             INSERT INTO garages (
//                 username, address, district, province, contact, contact1, services,
//                 description, time, wtime, ptime, etime, scale, website,
//                 facebook, instagram, twitter, image1, image2, image3
//             ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//             username, address, district, province, contact, contact1, services,
//             description, time, wtime, ptime, etime, scale, website,
//             facebook, instagram, twitter, image1, image2, image3
//         ];

//         try {
//             const [result] = await pool.execute(sql, values);
//             return result;
//         } catch (error) {
//             console.error('Error registering garage:', error.message);
//             throw new Error('Database operation failed');
//         }
//     }
// }

// module.exports = GarageModel;
