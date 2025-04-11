const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const validateProperty = require('../middleware/validateProperty');
const authMiddleware = require('../middleware/authMiddleware'); // ✅ New: Require auth

// GET /properties - List all properties (Public)
router.get('/', propertyController.getAllProperties);

// GET /properties/search - Search properties by query parameters (Public)
router.get('/search', propertyController.searchProperties);

// GET /properties/filter?min=2000&max=3000 - Filter by price range (Public)
router.get('/filter', propertyController.filterPropertiesByPrice);

// GET /properties/:id - Get a specific property by ID (Public)
router.get('/:id', propertyController.getPropertyById);

// POST /properties - Create a new property (Protected + Validated)
router.post('/', authMiddleware, validateProperty, propertyController.createProperty);

// PUT /properties/:id - Update a property (Protected + Validated)
router.put('/:id', authMiddleware, validateProperty, propertyController.updateProperty);

// DELETE /properties/:id - Delete a property (Protected)
router.delete('/:id', authMiddleware, propertyController.deleteProperty);

module.exports = router;

//modified on april 7th