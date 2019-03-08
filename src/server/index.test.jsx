import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import * as styledComponents from 'styled-components';
import dotenv from 'dotenv';
import loadInitialData from '../app/routes/loadInitialData';
import Document from './Document/component';

// mimic the logic in `src/index.js` which imports the `server/index.jsx`
dotenv.config({ path: './envConfig/local.env' });

const server = require('./index').default;

const validateHttpHeader = (headers, headerKey, expectedHeaderValue) => {
  const headerKeys = Object.keys(headers);
  const headerValues = Object.values(headers);
  const indexOfXFrame = headerKeys.indexOf(headerKey);

  expect(headerKeys).toContain(headerKey);
  expect(headerValues[indexOfXFrame]).toEqual(expectedHeaderValue);
};

jest.mock('react-dom/server', () => ({
  renderToString: jest.fn().mockImplementation(() => '<h1>Mock app</h1>'),
  renderToStaticMarkup: jest
    .fn()
    .mockImplementation(() => '<html><body><h1>Mock app</h1></body></html>'),
}));

jest.mock('react-helmet', () => ({
  Helmet: {
    renderStatic: jest.fn().mockReturnValue({ head: 'tags' }),
  },
}));

jest.mock('../app/routes/loadInitialData');

styledComponents.ServerStyleSheet = jest.fn().mockImplementation(() => ({
  collectStyles: jest.fn().mockReturnValue(<h1>Mock app</h1>),
  getStyleElement: jest.fn().mockReturnValue(<style />),
}));

describe('Server', () => {
  const makeRequest = async path => request(server).get(path);

  describe('/status', () => {
    it('should respond with a 200', async () => {
      const { statusCode } = await makeRequest('/status');
      expect(statusCode).toBe(200);
    });
  });

  describe('Manifest json', () => {
    describe('Services not on allowlist', () => {
      it('should serve a 404 error for service foobar', async () => {
        const { statusCode } = await makeRequest(
          '/foobar/articles/manifest.json',
        );
        expect(statusCode).toEqual(404);
      });
    });
  });

  describe('Data', () => {
    it('should respond with JSON', async () => {
      const { body } = await makeRequest('/news/articles/c85pqyj5m2ko.json');
      expect(body).toEqual(
        expect.objectContaining({ content: expect.any(Object) }),
      );
    });

    describe('with non-existent data', () => {
      it('should respond with a 404', async () => {
        const { statusCode } = await makeRequest(
          '/news/articles/cERROR00025o.json',
        );
        expect(statusCode).toEqual(404);
      });
    });
  });

  describe('/{service}/articles/{optimoID}', () => {
    const successDataResponse = {
      isAmp: false,
      data: { some: 'data' },
      service: 'someService',
      status: 200,
    };

    const notFoundDataResponse = {
      isAmp: false,
      data: { some: 'data' },
      service: 'someService',
      status: 404,
    };

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          loadInitialData.mockImplementationOnce(() =>
            Promise.resolve(successDataResponse),
          );
        });

        it('should respond with rendered data', async () => {
          const { text, status } = await makeRequest(
            '/news/articles/c0000000001o',
          );

          expect(status).toBe(200);

          expect(reactDomServer.renderToString).toHaveBeenCalledWith(
            <h1>Mock app</h1>,
          );

          expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
            <Document
              app="<h1>Mock app</h1>"
              assets={['one.js']}
              data={successDataResponse}
              helmet={{ head: 'tags' }}
              styleTags={<style />}
            />,
          );

          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });
      });

      describe('404 status code', () => {
        beforeEach(() => {
          loadInitialData.mockImplementationOnce(() =>
            Promise.resolve(notFoundDataResponse),
          );
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(
            '/news/articles/c0000000001o',
          );
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });
      });
    });

    describe('Unknown error within universal-react-app or its dependencies', () => {
      beforeEach(() => {
        loadInitialData.mockImplementationOnce(() =>
          Promise.reject(Error('Error!')),
        );
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(
          '/news/articles/c0000000001o',
        );
        expect(status).toEqual(500);
        expect(text).toEqual('Error!');
      });
    });
  });

  describe('/someInvalidPath', () => {
    it('should respond 404', async () => {
      const { status } = await makeRequest('/blah');

      expect(status).toBe(404);
    });
  });
});

describe('Server HTTP Headers', () => {
  let statusRequest;

  beforeAll(async () => {
    statusRequest = await request(server).get('/status');
  });

  it(`should not contain 'x-powered-by'`, () => {
    const headerKeys = Object.keys(statusRequest.headers);
    expect(headerKeys).not.toContain('x-powered-by');
  });

  it(`should have 'x-frame-options' set to 'DENY'`, () => {
    validateHttpHeader(statusRequest.headers, 'x-frame-options', 'DENY');
  });

  it(`should have X-DNS-Prefetch-Control set to 'off' `, () => {
    validateHttpHeader(statusRequest.headers, 'x-dns-prefetch-control', 'off');
  });

  it(`should have Strict-Transport-Security set to 'max-age=15552000; includeSubDomains' `, () => {
    validateHttpHeader(
      statusRequest.headers,
      'strict-transport-security',
      'max-age=15552000; includeSubDomains',
    );
  });

  it(`should have X-Download-Options set to 'noopen' `, () => {
    validateHttpHeader(statusRequest.headers, 'x-download-options', 'noopen');
  });

  it(`should have X-Content-Type-Options set to 'nosniff' `, () => {
    validateHttpHeader(
      statusRequest.headers,
      'x-content-type-options',
      'nosniff',
    );
  });

  it(`should have X-XSS-Protection set to '1; mode=block' `, () => {
    validateHttpHeader(
      statusRequest.headers,
      'x-xss-protection',
      '1; mode=block',
    );
  });

  describe("should set 'x-clacks-overhead' header", () => {
    it('should send the message on', async () => {
      validateHttpHeader(
        statusRequest.headers,
        'x-clacks-overhead',
        'GNU Terry Pratchett',
      );
    });

    it('should not log the message', async () => {
      global.console.log = jest.fn();

      const makeRequest = async path => request(server).get(path);

      await makeRequest('/status');

      expect(global.console.log).not.toHaveBeenCalledWith(
        'GNU Terry Pratchett',
      );
    });

    // It should turn the message around at the end of the line and send it back again (Currently untested)
  });
});
