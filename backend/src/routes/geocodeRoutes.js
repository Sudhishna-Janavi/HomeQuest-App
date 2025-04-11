// src/routes/geocodeRoutes.js

const express = require('express');
const router = express.Router();
const geocodeAddress = require('../geocode');

// GET /api/geocode?address=someaddress
router.get('/geocode', async (req, res) => {
  const { address } = req.query;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const location = await geocodeAddress(address);
    res.json({ message: 'Geocoding successful', location });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
