const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // email must be unique
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['tenant', 'landlord'],
    default: 'tenant'
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
