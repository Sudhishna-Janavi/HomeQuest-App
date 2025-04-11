// src/__tests__/app.test.js

const request = require('supertest');
const { app, server } = require('../../index');
const mongoose = require('mongoose');

describe('Root endpoint test', () => {
  it('should return a successful message on GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Hello from Express.js backend!');
  });
});

// Cleanup after tests
afterAll(async () => {
  if (server && typeof server.close === 'function') {
    server.close();
  }
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});
