import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import * as styledComponents from 'styled-components';
import { loadInitialData } from '@jtart/uni';
import Document from '../app/components/Document';

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

jest.mock('@jtart/uni', () => ({
  loadInitialData: jest.fn(),
  ServerUni: jest.fn().mockImplementation(() => <h1>Mock app</h1>),
}));

styledComponents.ServerStyleSheet = jest.fn().mockImplementation(() => ({
  collectStyles: jest.fn().mockReturnValue(<h1>Mock app</h1>),
  getStyleElement: jest.fn().mockReturnValue(<styles />),
}));

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
