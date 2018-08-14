import request from 'supertest';
import * as after from '@jaredpalmer/after';
import server from './index';

jest.mock(
  process.env.RAZZLE_ASSETS_MANIFEST,
  () => ({
    one: {
      js: 'one.js',
    },
  }),
  {
    virtual: true,
  },
);

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
    const renderWithTestData = mockRender => {
      after.render = jest.fn().mockImplementationOnce(mockRender);
    };

    it('should call render', async () => {
      after.render = jest.fn();
      await makeRequest('/');

      expect(after.render).toHaveBeenCalledTimes(1);
      expect(after.render).toHaveBeenCalledWith({
        req: expect.any(Object),
        res: expect.any(Object),
        routes: expect.any(Array),
        document: expect.any(Function),
        assets: ['one.js'],
      });
    });

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

  describe('no assets manifest', () => {
    it('should console log an error', async () => {
      jest.resetModules();
      jest.mock(process.env.RAZZLE_ASSETS_MANIFEST, () => null, {
        virtual: true,
      });
      global.console.log = jest.fn();

      await import('./index');

      expect(global.console.log).toHaveBeenCalledWith(
        `Error parsing assets manifest. RAZZLE_ASSETS_MANIFEST = ${
          process.env.RAZZLE_ASSETS_MANIFEST
        }`,
      );
    });
  });
});
