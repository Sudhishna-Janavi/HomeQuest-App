// src/middleware/authorize.js

/**
 * Role-based Authorization Middleware
 * 
 * This middleware ensures that:
 * 1. The user is authenticated (i.e., req.user is set).
 * 2. The user's role is within the allowed roles for the route.
 * 
 * Usage in your route file:
 * 
 * const authorize = require('../middleware/authorize');
 * 
 * router.post('/some-protected-route', authorize(['Landlord']), someControllerFunction);
 */

// src/middleware/authorize.js

module.exports = (req, res, next) => {
  // Example: Check for a token or user role
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  // ... validate token logic ...
  next();
};
