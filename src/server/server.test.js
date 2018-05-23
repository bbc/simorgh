import request from 'supertest';
import app from './server';

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response).not.toBe(null);
    expect(response.statusCode).toBe(200);
  });
});
