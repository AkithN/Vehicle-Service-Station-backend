const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const roleRoutes = require('./routes/roleRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const inquiriesRoutes = require('./routes/inquiriesRoutes');
const offersRoutes = require('./routes/offersRoutes');
const packagesRoutes = require('./routes/packagesRoutes');
const garageRoutes = require('./routes/garageRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files in the 'uploads' folder
app.use('/uploads', express.static('uploads'));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/roles', roleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contactus', contactRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/garages', garageRoutes);
app.use('/api/offers', offersRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/uploads', express.static('uploads'));





// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'An unexpected error occurred' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
