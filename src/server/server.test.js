import request from 'supertest';
import * as after from '@jaredpalmer/after';
import server, { getPublicDirectory } from './index';

describe('Server', () => {
  describe('getPublicDirectory', () => {
    it(`should set the directory path based on env`, () => {
      const envs = [
        { production: 'build/public' },
        { notProduction: 'public' },
      ];

      envs.forEach(env => {
        const key = Object.keys(env).shift();
        // sets an env variable globally for the running test process
        process.env.NODE_ENV = key;
        expect(getPublicDirectory()).toBe(env[key]);
      });
    });

    afterEach(() => {
      delete process.env.NODE_ENV;
    });
  });

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
    const renderWithTestData = mockRender => {
      after.render = jest.fn().mockImplementationOnce(mockRender);
    };

    describe('Successful render', () => {
      it('should respond with rendered data', async () => {
        const testData = 'data';

        renderWithTestData(() => testData);

        const { text } = await makeRequest('/');
        expect(text).toContain(testData);
      });
    });

    describe('Error', () => {
      it('should respond with the caught error', async () => {
        const testData = 'data';

        renderWithTestData(() => {
          throw testData;
        });

        const { text } = await makeRequest('/');
        expect(text).toContain(testData);
      });
    });
  });
});
