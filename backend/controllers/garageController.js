const pool = require('../config/db');

const registerGarage = async (req, res) => {
    const {
      garageName,
      garageAddress,
      district,
      province,
      workNum,
      mobileNum,
      services,
      garageDescription,
      operatingHoursWeek,
      operatingHoursWeekend,
      publicHoliday,
      emergencyService,
      serviceScale,
      website,
      facebook,
      instagram,
      twitter,
    } = req.body;
  
    const image1 = req.files?.image1 ? req.files.image1[0].filename : null;
    const image2 = req.files?.image2 ? req.files.image2[0].filename : null;
    const image3 = req.files?.image3 ? req.files.image3[0].filename : null;
  
    try {
      const [result] = await pool.query(
        `INSERT INTO garages (garageName, garageAddress, district, province, workNum, mobileNum, services, 
                              garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, 
                              emergencyService, serviceScale, website, facebook, instagram, twitter, 
                              image1, image2, image3) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          garageName,
          garageAddress,
          district,
          province,
          workNum,
          mobileNum,
          services,
          garageDescription,
          operatingHoursWeek,
          operatingHoursWeekend,
          publicHoliday,
          emergencyService,
          serviceScale,
          website,
          facebook,
          instagram,
          twitter,
          image1,
          image2,
          image3,
        ]
      );
  
      res.status(201).json({ message: 'Garage registered successfully!' });
    } catch (error) {
      console.error('Error registering garage:', error);
      res.status(500).json({ error: 'Failed to register garage' });
    }
  };
  

module.exports = {
  registerGarage,
};

// const path = require('path');
// const fs = require('fs');
// const pool = require('../config/db');

// const registerGarage = async (req, res) => {
//     try {
//         const {
//             garageName, garageAddress, district, province, workNum, mobileNum, services, 
//             garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, 
//             emergencyService, serviceScale, website, facebook, instagram, twitter
//         } = req.body;

//         // Handling images
//         const images = {};
//         ['image1', 'image2', 'image3'].forEach((imageField) => {
//             if (req.files[imageField]) {
//                 const image = req.files[imageField][0];
//                 const filename = `${Date.now()}-${image.originalname}`;
//                 const savePath = path.join(__dirname, '..', 'uploads', filename);
//                 fs.writeFileSync(savePath, image.buffer);
//                 images[imageField] = filename;
//             } else {
//                 images[imageField] = null;
//             }
//         });

//         const [result] = await pool.query(
//             `INSERT INTO garages 
//             (garageName, garageAddress, district, province, workNum, mobileNum, services, 
//             garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, 
//             emergencyService, serviceScale, website, facebook, instagram, twitter, image1, image2, image3) 
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//             [
//                 garageName, garageAddress, district, province, workNum, mobileNum, services.join(','), 
//                 garageDescription, operatingHoursWeek, operatingHoursWeekend, publicHoliday, 
//                 emergencyService, serviceScale, website, facebook, instagram, twitter, 
//                 images.image1, images.image2, images.image3
//             ]
//         );

//         res.status(201).json({ message: 'Garage registered successfully!' });
//     } catch (error) {
//         console.error('Error registering garage:', error);
//         res.status(500).json({ error: 'Failed to register garage' });
//     }
// };

// module.exports = { registerGarage };
