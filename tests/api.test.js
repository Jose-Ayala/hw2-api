const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('API Health and Functionality Tests', () => {

  // Test a CRUD Route (GET All Users)
  test('GET /api/users should return all 100 users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(100); 
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0].name).toHaveProperty('first');
  });

  // Test a Question Endpoint (Gender Count)
  test('GET /api/questions/gender-count should return the correct counts', async () => {
    const response = await request(app).get('/api/questions/gender-count');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('answer');
    
    const femaleCount = response.body.answer.find(item => item._id === 'female').count;
    const maleCount = response.body.answer.find(item => item._id === 'male').count;

    expect(femaleCount).toBe(46);
    expect(maleCount).toBe(54);
    expect(femaleCount + maleCount).toBe(100);
  });

  // Test a Second Question Endpoint (Average Age)
  test('GET /api/questions/average-age should return the correct average age', async () => {
    const response = await request(app).get('/api/questions/average-age');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('question');
    expect(response.body).toHaveProperty('answer');
    expect(response.body.answer).toHaveProperty('averageAge');
    expect(response.body.answer.averageAge).toBeCloseTo(52.07, 2); 
  });
});