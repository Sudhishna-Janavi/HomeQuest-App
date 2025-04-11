// src/controllers/userController.js

//code updated on April 7

const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Property = require('../models/propertyModel');// added for favourties!!!!!!!! april 7

// Helper to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// GET /users - Return all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Don't send password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /users - Create a new user (Registration)
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check for existing email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Email already registered. Please login.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: 'Username or email already in use' });
    }
    res.status(400).json({ message: error.message });
  }
};

// POST /users/login - Authenticate a user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      message: 'Login successful',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /users/:id - Get a specific user by ID
exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /users/:id - Update a user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;

    // If password is being updated, hash it
    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /users/:id - Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User with ID ${userId} deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//added april 7 for favorites !!!!!!!!!!!



exports.addFavorite = async (req, res) => {
  const { id } = req.params;
  const { propertyId } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure favorites array exists
    if (!user.favorites) {
      user.favorites = [];
    }

    if (!user.favorites.includes(propertyId)) {
      user.favorites.push(propertyId);
      await user.save();
    }

    res.status(200).json({ message: 'Property added to favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ Remove a property from favorites
exports.removeFavorite = async (req, res) => {
  const { id, propertyId } = req.params;

  try {
    const user = await User.findById(id);
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== propertyId
    );
    await user.save();
    res.status(200).json({ message: 'Property removed from favorites' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all favorite properties
exports.getFavorites = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate('favorites');
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
