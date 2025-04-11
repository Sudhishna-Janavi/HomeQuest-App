// src/models/propertyModel.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: [true, 'Address is required'],
      trim: true,
      unique: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    type: {
      type: String,
      required: [true, 'Property type is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['AVAILABLE', 'RENTED', 'UNDER_REVIEW'],
      default: 'AVAILABLE',
    },
    landlords: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'At least one landlord is required'],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.models.Property || mongoose.model('Property', propertySchema);
