import request from 'supertest';
import * as after from '@jaredpalmer/after';
import server from './index';

describe('Server', () => {
  const makeRequest = async path => request(server).get(path);

  it(`should not pass an 'x-powered-by' response header`, async () => {
    const { headers } = await makeRequest('/status');
    const headerKeys = Object.keys(headers);
    expect(headerKeys).not.toContain('x-powered-by');
  });

  describe('/status', () => {
    it('should respond with a 200', async () => {
      const { statusCode } = await makeRequest('/status');
      expect(statusCode).toBe(200);
    });
  });

  describe('/*', () => {
    const testResponseData = 'data';
    beforeEach(() => {
      after.render = jest.fn().mockImplementationOnce(() => testResponseData);
    });

    it('should respond with rendered data', async () => {
      const { text } = await makeRequest('/');
      expect(text).toEqual(testResponseData);
    });
  });
});
