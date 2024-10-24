import loggerMock from '#testHelpers/loggerMock'; // Must be imported before fetchPageData
import {
  DATA_FETCH_ERROR,
  DATA_REQUEST_RECEIVED,
  DATA_RESPONSE_FROM_CACHE,
} from '#lib/logger.const';
import {
  setWindowValue,
  resetWindowValue,
} from '#psammead/psammead-test-helpers/src';
import isLocal from '#app/lib/utilities/isLocal';
import fetchPageData from '.';

const expectedBaseUrl = 'http://localhost';
const requestedPathname = '/path/to/asset';
const fullTestPath =
  'https://test.mock-bff.api.bbc.com/simorgh-bff?pageType=bob';
const fullLivePath = 'https://mock-bff.api.bbc.com/simorgh-bff?pageType=bob';
const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;
const pageType = 'Fetch Page Data';
const requestOrigin = 'Jest Test';

jest.mock('#app/lib/utilities/isLocal', () => jest.fn());

const timeoutSpy = jest.spyOn(AbortSignal, 'timeout');

afterEach(() => {
  timeoutSpy.mockClear();
  jest.clearAllMocks();
  fetch.resetMocks();
});

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

    it('should always log data url and path', async () => {
      await fetchPageData({ path: requestedPathname });
      expect(loggerMock.debug).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        data: expectedUrl,
        path: requestedPathname,
      });
    });

    it('should log additional arguments if passed', async () => {
      await fetchPageData({ path: requestedPathname, pageType, requestOrigin });

      expect(loggerMock.debug).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        data: expectedUrl,
        path: requestedPathname,
        pageType,
        requestOrigin,
      });
    });

    it('should log data fetch response time on server', async () => {
      await fetchPageData({
        path: requestedPathname,
        shouldLogFetchTime: true,
      });
      const loggerCall = loggerMock.debug.mock.calls[1];

      expect(loggerCall[0]).toBe('data_fetch_response_time');
      expect(typeof loggerCall[1].nanoseconds).toBe('number');
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

    const fetchOptions = {
      headers: {
        'User-Agent': 'Simorgh/ws-web-rendering',
      },
    };

    it('should call fetch with the correct url when passed the pathname', async () => {
      await fetchPageData({ path: requestedPathname, pageType });

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expectedUrl, fetchOptions);
    });

    it('should call fetch with the correct url when passed the full test path', async () => {
      await fetchPageData({ path: fullTestPath, pageType });

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(fullTestPath, fetchOptions);
    });

    it('should call fetch with the correct url when passed the full live path', async () => {
      await fetchPageData({ path: fullLivePath, pageType });

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(fullLivePath, fetchOptions);
    });

    it('should call fetch on amp pages without .amp in pathname', async () => {
      await fetchPageData({ path: requestedPathname, pageType });

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expectedUrl, fetchOptions);
    });

    it('should call fetch with the correct headers when passed additional headers', async () => {
      const optHeaders = { 'ctx-service-env': 'live' };

      const expectedFetchOptions = {
        headers: {
          'User-Agent': 'Simorgh/ws-web-rendering',
          'ctx-service-env': 'live',
        },
      };
      await fetchPageData({ path: requestedPathname, pageType, optHeaders });

      expect(timeoutSpy).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedFetchOptions);
    });

    it('should return expected response', async () => {
      const response = await fetchPageData({
        path: requestedPathname,
        pageType,
      });

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
      fetch.mockRejectedValue(new Error('Failed to fetch'), { status: 500 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) =>
          expect({ message, status }).toEqual({
            message: 'Failed to fetch',
            status: 502,
          }),
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
        setWindowValue('location', false);

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: 500,
              data: expectedUrl,
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              message:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: 500,
            });
          },
        );
      });
    });

    describe('on client', () => {
      it('should return a 502 error code', () => {
        setWindowValue('location', true);

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: 502,
              data: expectedUrl,
              path: requestedPathname,
              pageType,
            });
            expect({ message, status }).toEqual({
              message:
                'invalid json response body at  reason: Unexpected end of JSON input',
              status: 502,
            });
          },
        );
      });
    });
  });

  describe('Request returns a 404 status code', () => {
    it('should return the status code as 404', async () => {
      fetch.mockResponse('Not found', { status: 404 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect({ message, status }).toEqual({
            message: 'data_response_404',
            status: 404,
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
        fetch.mockResponse("I'm a teapot", { status: 418 });

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error:
                'Unexpected upstream response (HTTP status code 418) when requesting http://localhost/path/to/asset.json',
              status: 500,
              data: expectedUrl,
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              status: 500,
              message: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
            });
          },
        );
      });

      it('should log, and propogate the status code as 500', async () => {
        fetch.mockResponse('Error', { status: 500 });

        return fetchPageData({ path: requestedPathname, pageType }).catch(
          ({ message, status }) => {
            expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
              error: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
              status: 500,
              data: expectedUrl,
              path: requestedPathname,
              pageType,
            });

            expect({ message, status }).toEqual({
              status: 500,
              message: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
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
      fetch.mockResponse("I'm a teapot", { status: 418 });

      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
            error: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
            status: 502,
            data: expectedUrl,
            path: requestedPathname,
            pageType,
          });

          expect({ message, status }).toEqual({
            status: 502,
            message: `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
          });
        },
      );
    });

    it('should log, and propogate the status code as 502', async () => {
      fetch.mockResponse('Internal server error', { status: 500 });
      return fetchPageData({ path: requestedPathname, pageType }).catch(
        ({ message, status }) => {
          expect(loggerMock.error).toBeCalledWith(DATA_FETCH_ERROR, {
            error: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
            status: 502,
            data: expectedUrl,
            path: requestedPathname,
            pageType,
          });

          expect({ message, status }).toEqual({
            status: 502,
            message: `Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
          });
        },
      );
    });
  });

  describe('with cache', () => {
    const response = JSON.stringify({
      metadata: {},
      content: {},
      promo: {},
    });

    const cache = new Map();
    cache.set('http://localhost/path/to/asset.json', response);

    beforeEach(() => {
      fetch.mockResponse(response);
    });

    it('does not use a cached response on local environment', async () => {
      isLocal.mockReturnValueOnce(true);

      await fetchPageData({ path: requestedPathname, pageType, cache });

      expect(loggerMock.info).not.toBeCalledWith(
        DATA_RESPONSE_FROM_CACHE,
        expect.any(Object),
      );
    });

    it('uses a cached response when not on local environment', async () => {
      isLocal.mockReturnValueOnce(false);

      await fetchPageData({ path: requestedPathname, pageType, cache });

      expect(loggerMock.debug).toHaveBeenNthCalledWith(
        2,
        DATA_RESPONSE_FROM_CACHE,
        {
          data: expectedUrl,
          path: requestedPathname,
          pageType,
        },
      );
    });
  });
});
