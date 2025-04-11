// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - Return all users
router.get('/', userController.getAllUsers);

// POST /users - Create a new user (registration)
router.post('/', userController.createUser);

// POST /users/login - Authenticate a user
router.post('/login', userController.loginUser);

// GET /users/:id - Get a specific user by ID
router.get('/:id', userController.getUserById);

// PUT /users/:id - Update a user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;

//favoriteS added on april 7

// FAVORITES
router.post('/:id/favorites', userController.addFavorite);
router.delete('/:id/favorites/:propertyId', userController.removeFavorite);
router.get('/:id/favorites', userController.getFavorites);

