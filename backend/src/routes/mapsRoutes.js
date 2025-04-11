// src/routes/mapsRoutes.js

const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController');

// Example route for advanced map logic
router.get('/', mapsController.exampleMapFunction);

module.exports = router;
