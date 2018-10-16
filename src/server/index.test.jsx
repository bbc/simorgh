import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import * as styledComponents from 'styled-components';
import { loadInitialData } from 'react-universal-app';
import Document from '../app/components/Document';

import server from './index';

const validateHttpHeader = (headers, headerKey, expectedHeaderValue) => {
  const headerKeys = Object.keys(headers);
  const headerValues = Object.values(headers);
  const indexOfXFrame = headerKeys.indexOf(headerKey);

  expect(headerKeys).toContain(headerKey);
  expect(headerValues[indexOfXFrame]).toEqual(expectedHeaderValue);
};

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

jest.mock('react-universal-app', () => ({
  loadInitialData: jest.fn(),
  ServerApp: jest.fn().mockImplementation(() => <h1>Mock app</h1>),
}));

styledComponents.ServerStyleSheet = jest.fn().mockImplementation(() => ({
  collectStyles: jest.fn().mockReturnValue(<h1>Mock app</h1>),
  getStyleElement: jest.fn().mockReturnValue(<styles />),
}));

describe('Server', () => {
  const makeRequest = async path => request(server).get(path);

  describe('/status', () => {
    it('should respond with a 200', async () => {
      const { statusCode } = await makeRequest('/status');
      expect(statusCode).toBe(200);
    });
  });

  describe('/*', () => {
    describe('Successful render', () => {
      beforeEach(() => {
        loadInitialData.mockImplementationOnce(() =>
          Promise.resolve({ some: 'data' }),
        );
      });

      it('should respond with rendered data', async () => {
        const { text } = await makeRequest('/some/route');

        expect(reactDomServer.renderToString).toHaveBeenCalledWith(
          <h1>Mock app</h1>,
        );

        expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
          <Document
            app="<h1>Mock app</h1>"
            assets={['one.js']}
            data={{ some: 'data' }}
            helmet={{ head: 'tags' }}
            styleTags={<styles />}
          />,
        );

        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });
    });

    describe('Error', () => {
      beforeEach(() => {
        loadInitialData.mockImplementationOnce(() =>
          Promise.reject(Error('Error!')),
        );
      });

      it('should respond with a 404', async () => {
        const { status, text } = await makeRequest('/');
        expect(status).toEqual(404);
        expect(text).toEqual('Error!');
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

describe('Server HTTP Header', () => {
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
});
