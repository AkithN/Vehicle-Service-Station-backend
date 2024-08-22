const pool = require('../config/db');

class GarageModel {
    static async registerGarage(data, images) {
        const {
            garageName, garageAddress, district, province, workNum, mobileNum,
            operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService,
            serviceScale, website, facebook, instagram, twitter, garageDescription
        } = data;

        const [image1, image2, image3] = images;

        const sqlGarage = `
            INSERT INTO registrationform (
                garageName, garageAddress, district, province, workNum, mobileNum,
                operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService,
                serviceScale, website, facebook, instagram, twitter, garageDescription,
                image1, image2, image3
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const garageValues = [
            garageName, garageAddress, district, province, workNum, mobileNum,
            operatingHoursWeek, operatingHoursWeekend, publicHoliday, emergencyService,
            serviceScale, website, facebook, instagram, twitter, garageDescription,
            image1, image2, image3
        ];

        try {
            const [garageResult] = await pool.execute(sqlGarage, garageValues);

            const serviceIds = data.services.split(',');
            for (const serviceId of serviceIds) {
                const sqlServiceType = `
                    INSERT INTO garageservicetype (garageId, serviceId)
                    VALUES (?, ?)
                `;
                await pool.execute(sqlServiceType, [garageResult.insertId, serviceId]);
            }

            return garageResult;
        } catch (error) {
            console.error('Error registering garage:', error.message);
            throw new Error('Database operation failed');
        }
    }
}

module.exports = GarageModel;
