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

  describe('Routing for requests that are not articles', () => {
    const data = [
      { route: '/status', responseCode: 200 },
      { route: '/*', responseCode: 404 },
    ];

    data.forEach(el => {
      it(`should respond with a ${el.responseCode}`, async () => {
        const { statusCode } = await makeRequest(el.route);
        expect(statusCode).toBe(el.responseCode);
      });
    });
  });

  describe('/article/*', () => {
    const renderWithTestData = mockRender => {
      after.render = jest.fn().mockImplementationOnce(mockRender);
    };

    describe('Successful render', () => {
      it('should respond with rendered data', async () => {
        const testData = 'data';

        renderWithTestData(() => testData);

        const { text } = await makeRequest('/article/id');
        expect(text).toContain(testData);
      });
    });

    describe('Error', () => {
      it('should respond with the caught error', async () => {
        const testData = 'data';

        renderWithTestData(() => {
          throw testData;
        });

        const { text } = await makeRequest('/article/id/');
        expect(text).toContain(testData);
      });
    });
  });
});
