// src/config/firebase.js
require('dotenv').config();
const admin = require('firebase-admin');
const path = require('path');

const relativePath = process.env.FIREBASE_KEY_PATH;
if (relativePath) {
  const serviceAccountPath = path.join(__dirname, '../../', relativePath);
  try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Error initializing Firebase Admin:', error);
  }
} else {
  console.log('FIREBASE_KEY_PATH not set, skipping Firebase Admin initialization.');
}

module.exports = admin;
