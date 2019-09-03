import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import * as styledComponents from 'styled-components';
import dotenv from 'dotenv';
import getRouteProps from '../app/routes/getInitialData/utils/getRouteProps';
import Document from './Document/component';
import { localBaseUrl } from '../testHelpers/config';

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

const mockRouteProps = ({ id, service, isAmp, dataResponse, responseType }) => {
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

const makeRequest = async path => request(server).get(path);

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/status', () => {
    it('should respond with a 200', async () => {
      const { statusCode } = await makeRequest('/status');
      expect(statusCode).toBe(200);
    });
  });

  describe('Manifest json', () => {
    describe('Services not on allowlist', () => {
      beforeEach(() => {
        const notFoundDataResponse = {
          isAmp: false,
          data: { some: 'data' },
          service: 'someService',
          status: 404,
        };

        mockRouteProps({
          service: 'someService',
          isAmp: false,
          dataResponse: notFoundDataResponse,
        });
      });

      it('should serve a 404 error for service foobar', async () => {
        const { statusCode } = await makeRequest(
          '/foobar/articles/manifest.json',
        );
        expect(statusCode).toEqual(404);
      });
    });

    describe('Unknown data fetch error', () => {
      beforeEach(() => {
        mockRouteProps({
          id: 'c0000000001o',
          service: 'news',
          isAmp: false,
          dataResponse: Error('Error!'),
          responseType: 'reject',
        });
      });

      it('should respond with a 500', async () => {
        const { statusCode } = await makeRequest(
          `/news/articles/manifest.json`,
        );
        expect(statusCode).toEqual(500);
      });
    });
  });

  describe('Service workers', () => {
    it('should serve a 404 error if path to service worker is invalid', async () => {
      const { statusCode } = await makeRequest('/non/existent/sw.js');
      expect(statusCode).toEqual(404);
    });

    describe('Unknown data fetch error', () => {
      beforeEach(() => {
        mockRouteProps({
          id: 'c0000000001o',
          service: 'news',
          isAmp: false,
          dataResponse: Error('Error!'),
          responseType: 'reject',
        });
      });

      it('should respond with a 500', async () => {
        const { statusCode } = await makeRequest('/news/articles/sw.js');
        expect(statusCode).toEqual(500);
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

      describe('Trailing slash redirects', () => {
        it('should respond with a 301', async () => {
          const { statusCode } = await makeRequest(
            '/news/articles/c6v11qzyv8po/',
          );
          expect(statusCode).toEqual(301);
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
        beforeEach(() => {
          const notFoundDataResponse = {
            isAmp: false,
            data: { some: 'data' },
            service: 'someService',
            status: 404,
          };

          mockRouteProps({
            service: 'someService',
            isAmp: false,
            dataResponse: notFoundDataResponse,
          });
        });

        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest('/ERROR.json');
          expect(statusCode).toEqual(404);
        });
      });
    });

    describe('for media page - live radio', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest(
          '/korean/bbc_korean_radio/liveradio.json',
        );
        expect(body).toEqual(
          expect.objectContaining({ content: expect.any(Object) }),
        );
      });

      describe('with non-existent data', () => {
        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest(
            '/korean/bbc_korean_radio/ERROR.json',
          );
          expect(statusCode).toEqual(404);
        });
      });
    });
  });

  describe('/{service}/articles/{optimoID}', () => {
    const isAmp = false;
    const successDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 200,
    };

    const notFoundDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 404,
    };
    const id = 'c0000000001o';
    const service = 'news';

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            id,
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        it('should respond with rendered data', async () => {
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
              assets={[
                `${localBaseUrl}/static/js/news-12345.12345.js`,
                `${localBaseUrl}/static/js/vendor-54321.12345.js`,
                `${localBaseUrl}/static/js/vendor-12345.12345.js`,
                `${localBaseUrl}/static/js/main-12345.12345.js`,
              ]}
              assetOrigins={[
                'https://ichef.bbci.co.uk',
                'https://gel.files.bbci.co.uk',
                localBaseUrl,
                'https://logws1363.ati-host.net?',
              ]}
              data={successDataResponse}
              helmet={{ head: 'tags' }}
              isAmp={isAmp}
              service={service}
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
          mockRouteProps({
            id,
            service,
            isAmp,
            dataResponse: notFoundDataResponse,
          });
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

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      beforeEach(() => {
        mockRouteProps({
          id,
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
        });
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

  describe('/{service}', () => {
    const service = 'igbo';
    const isAmp = false;
    const successDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 200,
    };

    const notFoundDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 404,
    };

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        it('should respond with rendered data', async () => {
          const { text, status } = await makeRequest(`/${service}`);

          expect(status).toBe(200);

          expect(reactDomServer.renderToString).toHaveBeenCalledWith(
            <h1>Mock app</h1>,
          );

          expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
            <Document
              app="<h1>Mock app</h1>"
              assets={[
                `${localBaseUrl}/static/js/igbo-12345.12345.js`,
                `${localBaseUrl}/static/js/vendor-54321.12345.js`,
                `${localBaseUrl}/static/js/vendor-12345.12345.js`,
                `${localBaseUrl}/static/js/main-12345.12345.js`,
              ]}
              assetOrigins={[
                'https://ichef.bbci.co.uk',
                'https://gel.files.bbci.co.uk',
                localBaseUrl,
                'https://logws1363.ati-host.net?',
              ]}
              data={successDataResponse}
              helmet={{ head: 'tags' }}
              isAmp={isAmp}
              service={service}
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
          mockRouteProps({
            service,
            isAmp,
            dataResponse: notFoundDataResponse,
          });
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(`/${service}`);
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(`/${service}`);
        expect(status).toEqual(500);
        expect(text).toEqual('Error!');
      });
    });
  });

  describe('media page - live radio', () => {
    const service = 'korean';
    const serviceId = 'bbc_korean_radio';
    const mediaId = 'liveradio';
    const isAmp = false;
    const successDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 200,
    };

    const notFoundDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 404,
    };

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        it('should respond with rendered data', async () => {
          const { text, status } = await makeRequest(
            `/${service}/${serviceId}/${mediaId}`,
          );

          expect(status).toBe(200);

          expect(reactDomServer.renderToString).toHaveBeenCalledWith(
            <h1>Mock app</h1>,
          );

          expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
            <Document
              app="<h1>Mock app</h1>"
              assets={[
                `${localBaseUrl}/static/js/korean-12345.12345.js`,
                `${localBaseUrl}/static/js/vendor-54321.12345.js`,
                `${localBaseUrl}/static/js/vendor-12345.12345.js`,
                `${localBaseUrl}/static/js/main-12345.12345.js`,
              ]}
              assetOrigins={[
                'https://ichef.bbci.co.uk',
                'https://gel.files.bbci.co.uk',
                localBaseUrl,
                'https://logws1363.ati-host.net?',
              ]}
              data={successDataResponse}
              helmet={{ head: 'tags' }}
              isAmp={isAmp}
              service={service}
              styleTags={<style />}
            />,
          );

          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });
      });
    });

    describe('404 status code', () => {
      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: notFoundDataResponse,
        });
      });

      it('should respond with a rendered 404', async () => {
        const { status, text } = await makeRequest(`/${service}`);
        expect(status).toBe(404);
        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(
          `/${service}/${serviceId}/${mediaId}`,
        );
        expect(status).toEqual(500);
        expect(text).toEqual('Error!');
      });
    });
  });

  describe('Unknown routes', () => {
    const service = 'igbo';
    const isAmp = false;
    const dataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'news',
      status: 404,
    };

    describe('404 status code', () => {
      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse,
        });
      });

      it('should respond with rendered data', async () => {
        const { text, status } = await makeRequest(`/${service}/foobar`);

        expect(status).toBe(404);

        expect(reactDomServer.renderToString).toHaveBeenCalledWith(
          <h1>Mock app</h1>,
        );

        expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
          <Document
            app="<h1>Mock app</h1>"
            assets={[
              `${localBaseUrl}/static/js/igbo-12345.12345.js`,
              `${localBaseUrl}/static/js/vendor-54321.12345.js`,
              `${localBaseUrl}/static/js/vendor-12345.12345.js`,
              `${localBaseUrl}/static/js/main-12345.12345.js`,
            ]}
            assetOrigins={[
              'https://ichef.bbci.co.uk',
              'https://gel.files.bbci.co.uk',
              localBaseUrl,
              'https://logws1363.ati-host.net?',
            ]}
            data={dataResponse}
            helmet={{ head: 'tags' }}
            isAmp={isAmp}
            service={service}
            styleTags={<style />}
          />,
        );

        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });
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

      await makeRequest('/status');

      expect(global.console.log).not.toHaveBeenCalledWith(
        'GNU Terry Pratchett',
      );
    });

    // It should turn the message around at the end of the line and send it back again (Currently untested)
  });
});
