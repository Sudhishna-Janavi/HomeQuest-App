// src/geocode.js

const axios = require('axios');

const googleMapsAPIKey = process.env.GOOGLE_MAPS_API_KEY;

const geocodeAddress = async (address) => {
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsAPIKey}`;

  try {
    const response = await axios.get(geocodeUrl);
    const data = response.data;

    if (data.status === 'OK') {
      const location = data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (error) {
    throw new Error(`Geocoding API error: ${error.message}`);
  }
};

module.exports = geocodeAddress;
