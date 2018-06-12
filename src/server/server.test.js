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
    const testResponseText = (testTitle, value, mockRender, testAssertion) => {
      it(testTitle, async () => {
        after.render = jest.fn().mockImplementationOnce(mockRender);
        const { text } = await makeRequest('/');
        testAssertion(text, value);
      });
    };

    describe('Successful render', () => {
      const testValue = 'data';
      testResponseText(
        'should respond with rendered data',
        testValue,
        () => testValue,
        (text, value) => expect(text).toContain(value),
      );
    });

    describe('Error', () => {
      const testValue = 'error';
      const mockRender = () => {
        throw testValue;
      };
      const testAssertion = (text, value) => expect(text).toContain(value);
      testResponseText(
        'should respond with the caught error',
        testValue,
        mockRender,
        testAssertion,
      );
    });
  });
});
