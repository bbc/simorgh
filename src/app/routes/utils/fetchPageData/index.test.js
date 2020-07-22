import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock'; // Must be imported before fetchPageData
import fetchPageData from '.';
import { DATA_FETCH_ERROR, DATA_REQUEST_RECEIVED } from '#lib/logger.const';
import sendCustomMetric from '#lib/utilities/customMetrics';
import { NON_200_RESPONSE } from '#lib/utilities/customMetrics/metrics.const';

const expectedBaseUrl = 'http://localhost';
const requestedPathname = '/path/to/asset';
const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;

afterEach(() => {
  jest.clearAllMocks();
  fetch.resetMocks();
});

jest.mock('#lib/utilities/customMetrics');

const pageType = 'Fetch Page Data';

describe('fetchPageData', () => {
  describe('data request received logging', () => {
    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify({
          metadata: {},
          content: {},
          promo: {},
        }),
      );
    });

    it('should always log url and path', async () => {
      await fetchPageData({ path: requestedPathname });
      expect(loggerMock.info).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        url: expectedUrl,
        path: requestedPathname,
      });
    });

    it('should log pageType if passed in as a parameter', async () => {
      await fetchPageData({ path: requestedPathname, pageType });

      expect(loggerMock.info).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        url: expectedUrl,
        path: requestedPathname,
        pageType,
      });
    });
  });

  describe('Successful fetch', () => {
    beforeEach(() => {
      fetch.mockResponse(
        JSON.stringify({
          metadata: {},
          content: {},
          promo: {},
        }),
      );
    });

    it('should call fetch with correct url', async () => {
      await fetchPageData({ path: requestedPathname });

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call fetch on amp pages without .amp in pathname', async () => {
      await fetchPageData({ path: requestedPathname });

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return expected response', async () => {
      const response = await fetchPageData({ path: requestedPathname });

      expect(response).toEqual({
        json: {
          metadata: {},
          content: {},
          promo: {},
        },
        status: 200,
      });
    });
  });

  describe('Rejected fetch', () => {
    it('should handle a rejected Ares fetch and return an error the Simorgh app can handle', () => {
      const expectedStatusCode = 502;

      fetch.mockRejectedValue(new Error('Failed to fetch'), {
        status: 500,
      });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect({ message, status }).toEqual({
            message: 'Failed to fetch',
            status: expectedStatusCode,
          });

          expect(sendCustomMetric).toBeCalledWith({
            metricName: NON_200_RESPONSE,
            pageType,
            requestUrl: requestedPathname,
            statusCode: expectedStatusCode,
          });
        },
      );
    });
  });

  describe('Request returns 200 status code, but invalid JSON', () => {
    afterAll(() => {
      resetWindowValue('location', window.location);
    });
    fetch.mockResponse('Some Invalid JSON');

    describe('on server', () => {
      it('should return a 500 error code', () => {
        const expectedStatusCode = 500;
        setWindowValue('location', false);

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: expectedStatusCode,
              url: 'http://localhost/path/to/asset.json',
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              message:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: expectedStatusCode,
            });

            expect(sendCustomMetric).toBeCalledWith({
              metricName: NON_200_RESPONSE,
              pageType,
              requestUrl: requestedPathname,
              statusCode: expectedStatusCode,
            });
          },
        );
      });
    });

    describe('on client', () => {
      it('should return a 502 error code', () => {
        const expectedStatusCode = 502;
        setWindowValue('location', true);

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: expectedStatusCode,
              url: 'http://localhost/path/to/asset.json',
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              message:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: expectedStatusCode,
            });

            expect(sendCustomMetric).toBeCalledWith({
              metricName: NON_200_RESPONSE,
              pageType,
              requestUrl: requestedPathname,
              statusCode: expectedStatusCode,
            });
          },
        );
      });
    });
  });

  describe('Request returns a 404 status code', () => {
    it('should return the status code as 404', async () => {
      const expectedStatusCode = 404;
      fetch.mockResponse('Not found', { status: 404 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect({ message, status }).toEqual({
            message: 'data_response_404',
            status: expectedStatusCode,
          });

          expect(sendCustomMetric).toBeCalledWith({
            metricName: NON_200_RESPONSE,
            pageType,
            requestUrl: requestedPathname,
            statusCode: expectedStatusCode,
          });
        },
      );
    });
  });

  describe('Request returns a non-200, non-404 status code', () => {
    afterAll(() => {
      resetWindowValue('location', window.location);
    });

    describe('on server', () => {
      beforeEach(() => {
        setWindowValue('location', false);
      });

      it('should log, and return the status code as 500', async () => {
        const expectedStatusCode = 500;
        fetch.mockResponse("I'm a teapot", { status: 418 });

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'Unexpected upstream response (HTTP status code 418) when requesting http://localhost/path/to/asset.json',
              status: expectedStatusCode,
              url: 'http://localhost/path/to/asset.json',
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              status: expectedStatusCode,
              message: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
            });

            expect(sendCustomMetric).toBeCalledWith({
              metricName: NON_200_RESPONSE,
              pageType,
              requestUrl: requestedPathname,
              statusCode: expectedStatusCode,
            });
          },
        );
      });

      it('should log, and propogate the status code as 500', async () => {
        const expectedStatusCode = 500;
        fetch.mockResponse('Error', { status: 500 });

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
              status: expectedStatusCode,
              url: 'http://localhost/path/to/asset.json',
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              status: expectedStatusCode,
              message: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
            });

            expect(sendCustomMetric).toBeCalledWith({
              metricName: NON_200_RESPONSE,
              pageType,
              requestUrl: requestedPathname,
              statusCode: expectedStatusCode,
            });
          },
        );
      });
    });
  });

  describe('on client', () => {
    beforeEach(() => {
      setWindowValue('location', true);
    });

    it('should log, and return the status code as 502', async () => {
      const expectedStatusCode = 502;
      fetch.mockResponse("I'm a teapot", { status: 418 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
            error: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
            status: expectedStatusCode,
            url: 'http://localhost/path/to/asset.json',
            path: requestedPathname,
            pageType,
          });

          expect({ message, status }).toEqual({
            status: expectedStatusCode,
            message: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
          });

          expect(sendCustomMetric).toBeCalledWith({
            metricName: NON_200_RESPONSE,
            pageType,
            requestUrl: requestedPathname,
            statusCode: expectedStatusCode,
          });
        },
      );
    });

    it('should log, and propogate the status code as 502', async () => {
      const expectedStatusCode = 502;
      fetch.mockResponse('Internal server error', { status: 500 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
            error: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
            status: expectedStatusCode,
            url: 'http://localhost/path/to/asset.json',
            path: requestedPathname,
            pageType,
          });

          expect({ message, status }).toEqual({
            status: expectedStatusCode,
            message: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
          });

          expect(sendCustomMetric).toBeCalledWith({
            metricName: NON_200_RESPONSE,
            pageType,
            requestUrl: requestedPathname,
            statusCode: expectedStatusCode,
          });
        },
      );
    });
  });
});
