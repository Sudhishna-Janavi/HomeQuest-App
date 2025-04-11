// index.js
require('dotenv').config(); // Load .env variables
const express = require('express');
const app = express();

// Database connection
const connectDB = require('./src/config/db');
connectDB();

// Firebase initialization (optional)
if (process.env.FIREBASE_KEY_PATH) {
  require('./src/config/firebase');
}

// Middleware
app.use(express.json());
const morgan = require('morgan');
app.use(morgan('dev'));

// Basic route for sanity check
app.get('/', (req, res) => {
  res.send('Hello from Express.js backend!');
});

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const propertyRoutes = require('./src/routes/propertyRoutes');
const mapsRoutes = require('./src/routes/mapsRoutes');
const geocodeRoutes = require('./src/routes/geocodeRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/properties', propertyRoutes);
app.use('/maps', mapsRoutes);
app.use('/api', geocodeRoutes); // or whichever path you prefer for geocoding

// Error handler middleware
const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server };
