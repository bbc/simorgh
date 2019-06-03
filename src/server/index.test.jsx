import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import * as styledComponents from 'styled-components';
import dotenv from 'dotenv';
import getRouteProps from '../app/routes/getInitialData/utils/getRouteProps';
import Document from './Document/component';
import getDials from './getDials';

jest.mock('./getDials');

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

jest.mock('../app/routes/getInitialData/utils/getRouteProps');

const mockRouteProps = (
  id,
  service,
  isAmp,
  dataResponse,
  responseType = 'resolve',
) => {
  const getInitialData =
    responseType === 'reject'
      ? jest.fn().mockRejectedValueOnce(dataResponse)
      : jest.fn().mockResolvedValueOnce(dataResponse);

  getRouteProps.mockReturnValue({
    isAmp,
    service,
    route: { getInitialData },
    match: {
      params: { id, service },
    },
  });
};

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
    describe('for articles', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest('/news/articles/c0g992jmmkko.json');
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

    describe('for front pages', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest('/igbo.json');
        expect(body).toEqual(
          expect.objectContaining({ content: expect.any(Object) }),
        );
      });

      describe('with non-existent data', () => {
        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest('/ERROR.json');
          expect(statusCode).toEqual(404);
        });
      });
    });
  });

  describe('Temporary frontpage routes', () => {
    const expectedRoutes = [
      { path: '/igbo', service: 'igbo' },
      { path: '/igbo/beta', service: 'igbo' },
      { path: '/pidgin', service: 'pidgin' },
      { path: '/pidgin/beta', service: 'pidgin' },
      { path: '/yoruba', service: 'yoruba' },
      { path: '/yoruba/beta', service: 'yoruba' },
      { path: '/igbo.amp', service: 'igbo' },
      { path: '/igbo/beta.amp', service: 'igbo' },
      { path: '/pidgin.amp', service: 'pidgin' },
      { path: '/pidgin/beta.amp', service: 'pidgin' },
      { path: '/yoruba.amp', service: 'yoruba' },
      { path: '/yoruba/beta.amp', service: 'yoruba' },
    ];

    expectedRoutes.forEach(({ path, service }) => {
      it('should respond with text', async () => {
        const { text } = await makeRequest(path);
        expect(text).toEqual(
          `Welcome to the temporary ${service} homepage simorgh route`,
        );
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
        const id = 'c0000000001o';
        const service = 'news';
        const isAmp = false;

        beforeEach(() => {
          mockRouteProps(id, service, isAmp, successDataResponse);
        });

        it('should respond with rendered data', async () => {
          const dials = { dial: 'value' };
          getDials.mockResolvedValue(dials);

          const { text, status } = await makeRequest(
            `/${service}/articles/${id}`,
          );

          expect(status).toBe(200);

          expect(reactDomServer.renderToString).toHaveBeenCalledWith(
            <h1>Mock app</h1>,
          );

          expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
            <Document
              app="<h1>Mock app</h1>"
              assets={['one.js']}
              assetOrigins={[
                'https://ichef.bbci.co.uk',
                'https://gel.files.bbci.co.uk',
                'http://localhost:7080',
              ]}
              data={successDataResponse}
              helmet={{ head: 'tags' }}
              isAmp={isAmp}
              service={service}
              styleTags={<style />}
              dials={dials}
            />,
          );

          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });

        it('should respond successfully even if dials fetch fails', async () => {
          getDials.mockRejectedValue(new Error('Fetch fail'));

          const { status } = await makeRequest('/news/articles/c0000000001o');
          expect(status).toBe(200);
        });
      });

      describe('404 status code', () => {
        const id = 'c0000000001o';
        const service = 'news';

        beforeEach(() => {
          mockRouteProps(id, service, false, notFoundDataResponse);
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(
            `/${service}/articles/${id}`,
          );
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });
      });
    });

    describe('Unknown error within universal-react-app or its dependencies', () => {
      const id = 'c0000000001o';
      const service = 'news';

      beforeEach(() => {
        mockRouteProps(id, service, false, Error('Error!'), 'reject');
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(
          `/${service}/articles/${id}`,
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
