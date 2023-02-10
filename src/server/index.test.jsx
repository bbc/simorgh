import React from 'react';
import request from 'supertest';
import * as reactDomServer from 'react-dom/server';
import dotenv from 'dotenv';
import getRouteProps from '#app/routes/utils/fetchPageData/utils/getRouteProps';
import defaultToggles from '#lib/config/toggles';
import loggerMock from '#testHelpers/loggerMock';
import {
  ROUTING_INFORMATION,
  SERVER_SIDE_RENDER_REQUEST_RECEIVED,
  SERVER_SIDE_REQUEST_FAILED,
} from '#lib/logger.const';
import { FRONT_PAGE, MEDIA_PAGE } from '#app/routes/utils/pageTypes';
import Document from './Document/component';
import routes from '../app/routes';
import * as renderDocument from './Document';
import sendCustomMetrics from './utilities/customMetrics';
import { NON_200_RESPONSE } from './utilities/customMetrics/metrics.const';
import { getMvtVaryHeaders } from './utilities/mvtHeader';

// mimic the logic in `src/index.js` which imports the `server/index.jsx`
dotenv.config({ path: './envConfig/local.env' });

const path = require('path');
const express = require('express');
const server = require('./index').default;
const getToggles = require('../app/lib/utilities/getToggles/withCache').default;

const sendFileSpy = jest.spyOn(express.response, 'sendFile');

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

jest.mock('@loadable/server', () => {
  class ChunkExtractor {
    collectChunks = arg => arg;

    getScriptElements = () => '__mock_script_elements__';

    getLinkElements = () => '__mock_link_elements__';
  }
  return {
    ChunkExtractor,
  };
});

jest.mock('#app/routes/utils/fetchPageData/utils/getRouteProps');
jest.mock('#app/lib/utilities/getToggles/withCache');

getToggles.mockImplementation(() => defaultToggles.local);

const mockRouteProps = ({
  id,
  service,
  isAmp,
  dataResponse,
  responseType,
  variant,
  pageType,
}) => {
  const getInitialData =
    responseType === 'reject'
      ? jest.fn().mockRejectedValueOnce(dataResponse)
      : jest.fn().mockResolvedValueOnce(dataResponse);

  // Add a leading slash to match what is received from the application routing regex.
  const mockVariantParam = variant ? `/${variant}` : undefined;

  getRouteProps.mockReturnValue({
    isAmp,
    service,
    variant,
    route: { getInitialData, pageType },
    match: {
      params: { id, service, variant: mockVariantParam },
    },
  });
};

jest.mock('./utilities/customMetrics');
jest.mock('./utilities/mvtHeader');

const renderDocumentSpy = jest.spyOn(renderDocument, 'default');

const makeRequest = async requestPath => request(server).get(requestPath);

const QUERY_STRING = '?param=test&query=1';

const testRenderedData =
  ({ url, service, isAmp, successDataResponse, variant }) =>
  async () => {
    const { text, status } = await makeRequest(url);

    expect(status).toBe(200);

    expect(reactDomServer.renderToString).toHaveBeenCalled();

    expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
      <Document
        app={{
          css: '',
          ids: [],
          html: '<h1>Mock app</h1>',
        }}
        data={successDataResponse}
        helmet={{ head: 'tags' }}
        isAmp={isAmp}
        legacyScripts="__mock_script_elements__"
        modernScripts="__mock_script_elements__"
        links="__mock_link_elements__"
      />,
    );

    const expectedProps = {
      bbcOrigin: undefined,
      data: successDataResponse,
      isAmp,
      service,
      routes,
      url,
    };

    if (variant) {
      expectedProps.variant = variant;
    }

    expect(renderDocumentSpy).toHaveBeenCalledWith(expectedProps);

    expect(getRouteProps).toHaveBeenCalledWith(url.split('?')[0]);

    expect(text).toEqual(
      '<!doctype html><html><body><h1>Mock app</h1></body></html>',
    );
  };

const assertNon200ResponseCustomMetrics = ({
  requestUrl,
  pageType,
  statusCode = 500,
}) => {
  it('should send custom metrics for non 200 response status code', async () => {
    await makeRequest(requestUrl);
    expect(sendCustomMetrics).toBeCalledWith({
      metricName: NON_200_RESPONSE,
      pageType,
      requestUrl,
      statusCode,
    });
  });
};

const testFrontPages = ({ platform, service, variant, queryString = '' }) => {
  const isAmp = platform === 'amp';
  const extension = isAmp ? '.amp' : '';
  const serviceURL = `/${service}${
    variant ? `/${variant}` : ''
  }${extension}${queryString}`;

  describe(`Front Page: ${serviceURL}`, () => {
    const successDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 200,
      variant,
    };

    const notFoundDataResponse = {
      isAmp,
      data: { some: 'data' },
      service: 'someService',
      status: 404,
      variant,
    };

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
            variant,
          });
        });

        const configs = {
          url: serviceURL,
          service,
          isAmp,
          successDataResponse,
          variant,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });

      describe('404 status code', () => {
        const pageType = 'Front Page';
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: notFoundDataResponse,
            variant,
            pageType,
          });
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(serviceURL);
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });

        assertNon200ResponseCustomMetrics({
          requestUrl: serviceURL,
          pageType,
          statusCode: 404,
        });
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = FRONT_PAGE;
      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          variant,
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(serviceURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: serviceURL,
        pageType,
      });
    });
  });
};

const testArticles = ({ platform, service, variant, queryString = '' }) => {
  const isAmp = platform === 'amp';
  const extension = isAmp ? '.amp' : '';

  describe(`Optimo Article: /${service}/articles/optimoID/${extension}${queryString}`, () => {
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

    const id = `c0000000001o`;
    const articleURL = `/${service}/articles/${id}${extension}${queryString}`;

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            id,
            service,
            isAmp,
            dataResponse: successDataResponse,
            variant,
          });
        });

        const configs = {
          url: articleURL,
          service,
          isAmp,
          successDataResponse,
          variant,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });

      describe('404 status code', () => {
        const pageType = 'articles';

        beforeEach(() => {
          mockRouteProps({
            id,
            service,
            isAmp,
            dataResponse: notFoundDataResponse,
            variant,
            pageType,
          });
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(articleURL);
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });

        assertNon200ResponseCustomMetrics({
          requestUrl: articleURL,
          pageType,
          statusCode: 404,
        });
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = 'articles';
      beforeEach(() => {
        mockRouteProps({
          id,
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          variant,
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(articleURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: articleURL,
        pageType,
      });
    });
  });
};

const testAssetPages = ({
  platform,
  service,
  assetUri,
  variant,
  queryString = '',
}) => {
  const isAmp = platform === 'amp';
  const extension = isAmp ? '.amp' : '';

  describe(`CPS Asset: /${service}/${assetUri}${extension}${queryString}`, () => {
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

    const articleURL = `/${service}/${assetUri}${extension}${queryString}`;

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            assetUri,
            service,
            isAmp,
            dataResponse: successDataResponse,
            variant,
          });
        });

        const configs = {
          url: articleURL,
          service,
          isAmp,
          successDataResponse,
          variant,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });

      describe('404 status code', () => {
        const pageType = 'CPS Asset';

        beforeEach(() => {
          mockRouteProps({
            assetUri,
            service,
            isAmp,
            dataResponse: notFoundDataResponse,
            variant,
            pageType,
          });
        });

        it('should respond with a rendered 404', async () => {
          const { status, text } = await makeRequest(articleURL);
          expect(status).toBe(404);
          expect(text).toEqual(
            '<!doctype html><html><body><h1>Mock app</h1></body></html>',
          );
        });

        assertNon200ResponseCustomMetrics({
          requestUrl: articleURL,
          pageType,
          statusCode: 404,
        });
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = 'cpsAsset';

      beforeEach(() => {
        mockRouteProps({
          assetUri,
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          variant,
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(articleURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: articleURL,
        pageType,
      });
    });
  });
};

const testMediaPages = ({
  platform,
  service,
  serviceId,
  mediaId,
  queryString = '',
}) => {
  describe(`${platform} radio page - live radio`, () => {
    const isAmp = platform === 'amp';
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

    const extension = isAmp ? '.amp' : '';
    const mediaPageURL = `/${service}/${serviceId}/${mediaId}${extension}${queryString}`;

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        const configs = {
          url: mediaPageURL,
          service,
          isAmp,
          successDataResponse,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });
    });

    describe('404 status code', () => {
      const pageType = MEDIA_PAGE;

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: notFoundDataResponse,
          pageType,
        });
      });

      it('should respond with a rendered 404', async () => {
        const { status, text } = await makeRequest(mediaPageURL);
        expect(status).toBe(404);
        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
        statusCode: 404,
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = 'liveRadio';

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(mediaPageURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
      });
    });
  });
};

const testTvPages = ({
  platform,
  service,
  serviceId,
  brandEpisode,
  mediaId,
  queryString = '',
}) => {
  describe(`${platform} tv brand page`, () => {
    const isAmp = platform === 'amp';
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

    const extension = isAmp ? '.amp' : '';
    const mediaPageURL = `/${service}/${serviceId}/${brandEpisode}/${mediaId}${extension}${queryString}`;

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        const configs = {
          url: mediaPageURL,
          service,
          isAmp,
          successDataResponse,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });
    });

    describe('404 status code', () => {
      const pageType = 'On Demand TV Brand';

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: notFoundDataResponse,
          pageType,
        });
      });

      it('should respond with a rendered 404', async () => {
        const { status, text } = await makeRequest(mediaPageURL);
        expect(status).toBe(404);
        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
        statusCode: 404,
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = 'onDemandTVBrand';

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(mediaPageURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
      });
    });
  });
};

const testOnDemandTvEpisodePages = ({
  platform,
  service,
  serviceId,
  brandEpisode,
  mediaId,
  queryString = '',
}) => {
  describe(`${platform} tv episode page`, () => {
    const isAmp = platform === 'amp';
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

    const extension = isAmp ? '.amp' : '';
    const mediaPageURL = `/${service}/${serviceId}/${brandEpisode}/${mediaId}${extension}${queryString}`;

    describe('Successful render', () => {
      describe('200 status code', () => {
        beforeEach(() => {
          mockRouteProps({
            service,
            isAmp,
            dataResponse: successDataResponse,
          });
        });

        const configs = {
          url: mediaPageURL,
          service,
          isAmp,
          successDataResponse,
        };

        it('should respond with rendered data', testRenderedData(configs));
      });
    });

    describe('404 status code', () => {
      const pageType = 'On Demand TV Episode';

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: notFoundDataResponse,
          pageType,
        });
      });

      it('should respond with a rendered 404', async () => {
        const { status, text } = await makeRequest(`/${service}`);
        expect(status).toBe(404);
        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
        statusCode: 404,
      });
    });

    describe('Unknown error within the data fetch, react router or its dependencies', () => {
      const pageType = 'onDemandTVEpisode';

      beforeEach(() => {
        mockRouteProps({
          service,
          isAmp,
          dataResponse: Error('Error!'),
          responseType: 'reject',
          pageType,
        });
      });

      it('should respond with a 500', async () => {
        const { status, text } = await makeRequest(mediaPageURL);
        expect(status).toEqual(500);
        expect(text).toEqual('Internal server error');
      });

      assertNon200ResponseCustomMetrics({
        requestUrl: mediaPageURL,
        pageType,
      });
    });
  });
};

describe('Server', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/status', () => {
    it('should respond with a 200', async () => {
      const { statusCode, text } = await makeRequest('/status');
      expect(statusCode).toBe(200);
      expect(text).toEqual('Ok');
    });
  });

  describe('Service workers', () => {
    it('should serve a file for existing service workers', async () => {
      await makeRequest('/news/articles/sw.js');
      expect(sendFileSpy.mock.calls[0][0]).toEqual(
        path.join(__dirname, '/public/sw.js'),
      );
    });

    it('should not serve a file for non-existing service workers', async () => {
      const { statusCode } = await makeRequest('/some-service/articles/sw.js');
      expect(sendFileSpy.mock.calls.length).toEqual(0);
      expect(statusCode).toEqual(500);
    });

    it('should serve the sw.js with cache control information', async () => {
      const { header } = await makeRequest('/pidgin/sw.js');
      expect(header['cache-control']).toBe(
        'public, stale-if-error=6000, stale-while-revalidate=300, max-age=300',
      );
    });
  });

  describe('Manifest json', () => {
    it('should serve a file for valid service paths', async () => {
      await makeRequest('/news/articles/manifest.json');
      expect(sendFileSpy.mock.calls[0][0]).toEqual(
        path.join(__dirname, '/public/news/manifest.json'),
      );
    });

    it('should not serve a manifest file for non-existing services', async () => {
      const { statusCode } = await makeRequest('/some-service/manifest.json');
      expect(sendFileSpy.mock.calls.length).toEqual(0);
      expect(statusCode).toEqual(500);
    });

    it('should serve a response cache control of 7 days', async () => {
      const { header } = await makeRequest('/news/articles/manifest.json');
      expect(header['cache-control']).toBe('public, max-age=604800');
    });
  });

  describe('Most Read json', () => {
    it('should serve a file for valid service paths with variants', async () => {
      const { body } = await makeRequest('/zhongwen/mostread/trad.json');
      expect(body).toEqual(
        expect.objectContaining({ records: expect.any(Object) }),
      );
    });
    it('should serve a file for valid service paths without variants', async () => {
      const { body } = await makeRequest('/news/mostread.json');
      expect(body).toEqual(
        expect.objectContaining({ records: expect.any(Object) }),
      );
    });
    it('should respond with a 500 for non-existing services', async () => {
      const { statusCode } = await makeRequest('/some-service/mostread.json');
      expect(statusCode).toEqual(500);
    });
  });

  describe('STY secondary column json', () => {
    it('should serve a file for valid service paths with variants', async () => {
      const { body } = await makeRequest(
        '/zhongwen/sty-secondary-column/trad.json',
      );
      expect(body).toEqual(
        expect.objectContaining({
          topStories: expect.any(Object),
          features: expect.any(Object),
        }),
      );
    });
    it('should serve a file for valid service paths without variants', async () => {
      const { body } = await makeRequest('/mundo/sty-secondary-column.json');
      expect(body).toEqual(
        expect.objectContaining({
          topStories: expect.any(Object),
          features: expect.any(Object),
        }),
      );
    });
    it('should respond with a 500 for non-existing services', async () => {
      const { statusCode } = await makeRequest(
        '/some-service/sty-secondary-column.json',
      );
      expect(statusCode).toEqual(500);
    });
  });

  describe('Recommendations json', () => {
    // This is being skipped due to variants not needing recommendations
    it.skip('should serve a file for valid service paths with variants', async () => {
      const { body } = await makeRequest(
        '/zhongwen/uk-23283128/recommendations/trad.json',
      );
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            headlines: expect.any(Object),
          }),
        ]),
      );
    });
    it('should serve a file for valid service paths without variants', async () => {
      const { body } = await makeRequest(
        '/mundo/23263889/recommendations.json',
      );
      expect(body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            headlines: expect.any(Object),
          }),
        ]),
      );
    });
    it('should respond with a 500 for non-existing services', async () => {
      const { statusCode } = await makeRequest(
        '/some-service/recommendations.json',
      );
      expect(statusCode).toEqual(500);
    });
  });

  describe('IDX json', () => {
    it('should serve a file for valid idx paths', async () => {
      const { body } = await makeRequest('/persian/afghanistan.json');
      expect(body).toEqual(
        expect.objectContaining({ content: expect.any(Object) }),
      );
    });
    it('should respond with a 500 for non-existing services', async () => {
      const { statusCode } = await makeRequest(
        '/some-service/ukraine_in_russian.json',
      );
      expect(statusCode).toEqual(500);
    });
  });

  describe('Data', () => {
    describe('for articles', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest('/news/articles/c0g992jmmkko.json');
        expect(body).toEqual(
          expect.objectContaining({ data: expect.any(Object) }),
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
        const { body } = await makeRequest('/persian.json');
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

    describe('for radio page - live radio', () => {
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

    describe('for radio schedules', () => {
      it('should respond with JSON for service with radio schedule', async () => {
        const { body } = await makeRequest(
          '/arabic/bbc_arabic_radio/schedule.json',
        );
        expect(body).toEqual(
          expect.objectContaining({ schedules: expect.any(Object) }),
        );
      });

      it('should respond with 404 for service without radio schedule', async () => {
        const { statusCode } = await makeRequest(
          '/pidgin/bbc_pidgin_radio/schedule.json',
        );
        expect(statusCode).toEqual(404);
      });

      it('should respond with 404 for invalid service paths', async () => {
        const { statusCode } = await makeRequest(
          '/arabic/bbc_pidgin_radio/schedule.json',
        );
        expect(statusCode).toEqual(404);
      });
    });

    describe('for tv brand page', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest(
          '/pashto/bbc_pashto_tv/tv_programmes/w13xttn4.json',
        );
        expect(body).toEqual(
          expect.objectContaining({ content: expect.any(Object) }),
        );
      });

      describe('with non-existent data', () => {
        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest(
            '/pashto/bbc_pashto_radio/ERROR.json',
          );
          expect(statusCode).toEqual(404);
        });
      });
    });

    describe('for cps asset pages', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest('/pidgin/tori-49450859.json');
        expect(body).toEqual(
          expect.objectContaining({ content: expect.any(Object) }),
        );
      });
      describe('with non-existent data', () => {
        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest(
            '/pidgin/tori-00000000.json',
          );
          expect(statusCode).toEqual(404);
        });
      });
    });

    describe('for legacy asset pages', () => {
      it('should respond with JSON', async () => {
        const { body } = await makeRequest(
          '/hausa/multimedia/2012/07/120712_click.json',
        );
        expect(body).toEqual(
          expect.objectContaining({ content: expect.any(Object) }),
        );
      });

      describe('with non-existent data', () => {
        it('should respond with a 404', async () => {
          const { statusCode } = await makeRequest(
            '/hausa/multimedia/2012/07/120712_non-existent.json',
          );
          expect(statusCode).toEqual(404);
        });
      });
    });
  });

  testFrontPages({ platform: 'canonical', service: 'igbo' });
  testFrontPages({
    platform: 'canonical',
    service: 'igbo',
    queryString: QUERY_STRING,
  });
  testFrontPages({ platform: 'amp', service: 'igbo' });
  testFrontPages({
    platform: 'amp',
    service: 'igbo',
    queryString: QUERY_STRING,
  });
  testFrontPages({
    platform: 'canonical',
    service: 'ukchina',
    variant: 'simp',
  });
  testFrontPages({
    platform: 'canonical',
    service: 'ukchina',
    variant: 'simp',
    queryString: QUERY_STRING,
  });
  testFrontPages({ platform: 'amp', service: 'serbian', variant: 'lat' });
  testFrontPages({
    platform: 'amp',
    service: 'serbian',
    variant: 'lat',
    queryString: QUERY_STRING,
  });

  testArticles({ platform: 'amp', service: 'news' });
  testArticles({ platform: 'amp', service: 'news', queryString: QUERY_STRING });
  testArticles({ platform: 'canonical', service: 'news' });
  testArticles({
    platform: 'canonical',
    service: 'news',
    queryString: QUERY_STRING,
  });
  testArticles({ platform: 'amp', service: 'zhongwen', variant: 'trad' });
  testArticles({
    platform: 'amp',
    service: 'zhongwen',
    variant: 'trad',
    queryString: QUERY_STRING,
  });
  testArticles({ platform: 'canonical', service: 'zhongwen', variant: 'simp' });
  testArticles({
    platform: 'canonical',
    service: 'zhongwen',
    variant: 'simp',
    queryString: QUERY_STRING,
  });

  testMediaPages({
    platform: 'amp',
    service: 'korean',
    serviceId: 'bbc_korean_radio',
    mediaId: 'liveradio',
  });
  testMediaPages({
    platform: 'amp',
    service: 'korean',
    serviceId: 'bbc_korean_radio',
    mediaId: 'liveradio',
    queryString: QUERY_STRING,
  });
  testMediaPages({
    platform: 'canonical',
    service: 'korean',
    serviceId: 'bbc_korean_radio',
    mediaId: 'liveradio',
  });
  testMediaPages({
    platform: 'canonical',
    service: 'korean',
    serviceId: 'bbc_korean_radio',
    mediaId: 'liveradio',
    queryString: QUERY_STRING,
  });

  testTvPages({
    platform: 'amp',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    brandEpisode: 'tv_programmes',
    mediaId: 'p0340yr4',
  });
  testTvPages({
    platform: 'amp',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    brandEpisode: 'tv_programmes',
    mediaId: 'p0340yr4',
    queryString: QUERY_STRING,
  });
  testTvPages({
    platform: 'canonical',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    brandEpisode: 'tv_programmes',
    mediaId: 'p0340yr4',
  });
  testTvPages({
    platform: 'canonical',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    brandEpisode: 'tv_programmes',
    mediaId: 'p0340yr4',
    queryString: QUERY_STRING,
  });

  testOnDemandTvEpisodePages({
    platform: 'amp',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    brandEpisode: 'tv',
    mediaId: 'w172xcldhhrhmcf',
  });

  testOnDemandTvEpisodePages({
    platform: 'canonical',
    service: 'pashto',
    serviceId: 'bbc_pashto_tv',
    mediaId: 'w172xcldhhrhmcf',
  });

  testAssetPages({
    platform: 'amp',
    service: 'pidgin',
    assetUri: 'tori-49450859',
  });
  testAssetPages({
    platform: 'amp',
    service: 'pidgin',
    assetUri: 'tori-49450859',
    queryString: QUERY_STRING,
  });
  testAssetPages({
    platform: 'canonical',
    service: 'pidgin',
    assetUri: 'tori-49450859',
  });
  testAssetPages({
    platform: 'canonical',
    service: 'pidgin',
    assetUri: 'tori-49450859',
    queryString: QUERY_STRING,
  });
  testAssetPages({
    platform: 'amp',
    service: 'serbian',
    assetUri: 'srbija-49427344',
    variant: 'cyr',
  });
  testAssetPages({
    platform: 'canonical',
    service: 'serbian',
    assetUri: 'srbija-49427344',
    variant: 'cyr',
    queryString: QUERY_STRING,
  });

  // Legacy asset pages
  testAssetPages({
    platform: 'amp',
    service: 'hausa',
    assetUri: 'multimedia/2012/07/120712_click',
  });
  testAssetPages({
    platform: 'amp',
    service: 'hausa',
    assetUri: 'multimedia/2012/07/120712_click',
    queryString: QUERY_STRING,
  });
  testAssetPages({
    platform: 'canonical',
    service: 'hausa',
    assetUri: 'multimedia/2012/07/120712_click',
  });
  testAssetPages({
    platform: 'canonical',
    service: 'hausa',
    assetUri: 'multimedia/2012/07/120712_click',
    queryString: QUERY_STRING,
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

        expect(reactDomServer.renderToString).toHaveBeenCalled();

        expect(reactDomServer.renderToStaticMarkup).toHaveBeenCalledWith(
          <Document
            app={{
              css: '',
              ids: [],
              html: '<h1>Mock app</h1>',
            }}
            data={dataResponse}
            helmet={{ head: 'tags' }}
            isAmp={isAmp}
            legacyScripts="__mock_script_elements__"
            modernScripts="__mock_script_elements__"
            links="__mock_link_elements__"
          />,
        );

        expect(renderDocumentSpy).toHaveBeenCalled();

        expect(text).toEqual(
          '<!doctype html><html><body><h1>Mock app</h1></body></html>',
        );
      });
    });
  });
});

describe('Server HTTP Headers - Status Endpoint', () => {
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
    validateHttpHeader(statusRequest.headers, 'x-xss-protection', '0');
  });
});

describe('Server HTTP Headers - Page Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const successDataResponse = {
    isAmp: false,
    data: { some: 'data' },
    service: 'someService',
    status: 200,
  };

  it(`should set a cache-control header`, async () => {
    const { header } = await makeRequest('/mundo');

    expect(header['cache-control']).toBe(
      'public, stale-if-error=120, stale-while-revalidate=30, max-age=30',
    );
  });

  it(`should set a Referrer-Policy header`, async () => {
    const { header } = await makeRequest('/mundo');

    expect(header['referrer-policy']).toBe('no-referrer-when-downgrade');
  });

  it(`should add mvt experiment header names to vary if they are enabled`, async () => {
    mockRouteProps({
      dataResponse: successDataResponse,
    });
    getMvtVaryHeaders.mockReturnValue('mvt-simorgh_dark_mode');

    const { header } = await makeRequest('/mundo/c0000000001o');

    expect(header.vary).toBe('mvt-simorgh_dark_mode, Accept-Encoding');
  });

  it(`should not add mvt experiment header names to vary if they are not enabled`, async () => {
    mockRouteProps({
      dataResponse: successDataResponse,
    });
    getMvtVaryHeaders.mockReturnValue('');

    const { header } = await makeRequest('/mundo/articles/c0000000001o');

    expect(header.vary).toBe('Accept-Encoding');
  });

  it(`should not add mvt experiment header names to vary if on AMP`, async () => {
    mockRouteProps({
      dataResponse: successDataResponse,
      isAmp: true,
    });
    getMvtVaryHeaders.mockReturnValue('mvt-simorgh_dark_mode');

    const { header } = await makeRequest('/mundo/articles/c0000000001o');

    expect(header.vary).toBe('Accept-Encoding');
  });
});

describe('Routing Information Logging', () => {
  const service = 'igbo';
  const isAmp = false;
  const url = `/${service}`;
  const dataResponse = {
    isAmp,
    pageData: {
      metadata: {
        type: 'Page Type from Data',
      },
    },
    service,
    status: 200,
  };

  it(`on non-200 response should log matched page type from route`, async () => {
    const pageType = 'Matching Page Type from Route';
    const status = 404;
    mockRouteProps({
      service,
      isAmp,
      dataResponse: { ...dataResponse, status },
      pageType,
    });
    await makeRequest(url);

    expect(loggerMock.info).toHaveBeenCalledWith(ROUTING_INFORMATION, {
      url,
      status,
      pageType,
    });
  });

  it(`on 200 response should log page type derived from response data`, async () => {
    mockRouteProps({
      service,
      isAmp,
      dataResponse,
    });
    await makeRequest(url);

    expect(loggerMock.info).toHaveBeenCalledWith(ROUTING_INFORMATION, {
      url,
      status: 200,
      pageType: 'Page Type from Data',
    });
  });
});

describe('Exclusion of sensitive HTTP headers from logs', () => {
  const SAFE_HEADER = 'x-safe-header';
  const SENSITIVE_HEADER = 'x-sensitive-header';
  const act = () =>
    request(server)
      .get('/pidgin')
      .set(SAFE_HEADER, 'test')
      .set(SENSITIVE_HEADER, 'test');

  const assertHeaderWasLogged = (logger, logCategory, header) => {
    expect(logger).toHaveBeenCalledWith(
      logCategory,
      expect.objectContaining({
        headers: expect.objectContaining({
          [header]: 'test',
        }),
      }),
    );
  };

  const assertHeaderWasNotLogged = (logger, logCategory, header) => {
    expect(logger).toHaveBeenCalledWith(
      logCategory,
      expect.objectContaining({
        headers: expect.not.objectContaining({
          [header]: 'test',
        }),
      }),
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SENSITIVE_HTTP_HEADERS = 'x-sensitive-header,x-another-one';
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.SENSITIVE_HTTP_HEADERS;
  });

  it(`when the environment variable isn't set`, async () => {
    delete process.env.SENSITIVE_HTTP_HEADERS;
    await act();

    assertHeaderWasLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SAFE_HEADER,
    );
    assertHeaderWasLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SENSITIVE_HEADER,
    );
  });

  it(`when simorgh responds successfully`, async () => {
    await act();

    assertHeaderWasLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SAFE_HEADER,
    );
    assertHeaderWasNotLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SENSITIVE_HEADER,
    );
  });

  it(`when simorgh fails due to a getInitialData error`, async () => {
    mockRouteProps({
      dataResponse: Error('Oh no'),
    });

    await act();

    assertHeaderWasLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SAFE_HEADER,
    );
    assertHeaderWasNotLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SENSITIVE_HEADER,
    );
    assertHeaderWasLogged(
      loggerMock.error,
      SERVER_SIDE_REQUEST_FAILED,
      SAFE_HEADER,
    );
    assertHeaderWasNotLogged(
      loggerMock.error,
      SERVER_SIDE_REQUEST_FAILED,
      SENSITIVE_HEADER,
    );
  });

  it(`when simorgh fails due to a renderDocument error`, async () => {
    renderDocument.default.mockImplementation(() => Error('Oh no'));

    await act();

    assertHeaderWasLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SAFE_HEADER,
    );
    assertHeaderWasNotLogged(
      loggerMock.info,
      SERVER_SIDE_RENDER_REQUEST_RECEIVED,
      SENSITIVE_HEADER,
    );
    assertHeaderWasLogged(
      loggerMock.error,
      SERVER_SIDE_REQUEST_FAILED,
      SAFE_HEADER,
    );
    assertHeaderWasNotLogged(
      loggerMock.error,
      SERVER_SIDE_REQUEST_FAILED,
      SENSITIVE_HEADER,
    );
  });
});
