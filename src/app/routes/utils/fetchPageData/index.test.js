import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock'; // Must be imported before fetchPageData
import fetchPageData, { getUrl } from '.';
import { DATA_FETCH_ERROR, DATA_REQUEST_RECEIVED } from '#lib/logger.const';

const expectedBaseUrl = 'http://localhost';
const requestedPathname = '/path/to/asset';
const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;
const pageType = 'Fetch Page Data';

afterEach(() => {
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
      expect(loggerMock.info).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        data: expectedUrl,
        path: requestedPathname,
      });
    });

    it('should log pageType if passed in as a parameter', async () => {
      await fetchPageData({ path: requestedPathname, pageType });

      expect(loggerMock.info).toBeCalledWith(DATA_REQUEST_RECEIVED, {
        data: expectedUrl,
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
      await fetchPageData({ path: requestedPathname, pageType });

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call fetch on amp pages without .amp in pathname', async () => {
      await fetchPageData({ path: requestedPathname, pageType });

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
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
});

describe('getUrl', () => {
  it('should return empty string when pathname empty', () => {
    expect(getUrl('')).toEqual('');
  });

  it('should return empty string when pathname null', () => {
    expect(getUrl(null)).toEqual('');
  });

  it('should return empty string when pathname undefined', () => {
    expect(getUrl(undefined)).toEqual('');
  });

  it('should return url', () => {
    expect(getUrl('/test/article')).toEqual(
      'http://localhost/test/article.json',
    );
  });

  it('should remove .amp from url', () => {
    expect(getUrl('/test/article.amp')).toEqual(
      'http://localhost/test/article.json',
    );
  });

  describe('where application environment', () => {
    describe('is not live', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'not-live';
      });

      it('should append single query string parameter', () => {
        expect(getUrl('/test/article?param=test')).toEqual(
          'http://localhost/test/article.json?param=test',
        );
      });

      it('should append multiple query string parameters', () => {
        expect(getUrl('/test/article?first=1&second=2')).toEqual(
          'http://localhost/test/article.json?first=1&second=2',
        );
      });

      it('should remove .amp from url with params', () => {});
      expect(getUrl('/test/article.amp?param=test')).toEqual(
        'http://localhost/test/article.json?param=test',
      );
    });

    describe('is live', () => {
      beforeEach(() => {
        process.env.SIMORGH_APP_ENV = 'live';
      });

      it('should remove single query string parameter from url', () => {
        expect(getUrl('/test/article?param=test')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove multiple query string parameter from url', () => {
        expect(getUrl('/test/article?first=1&second=2')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove .amp and single query string parameter from url', () => {
        expect(getUrl('/test/article.amp?param=test')).toEqual(
          'http://localhost/test/article.json',
        );
      });

      it('should remove .amp and multiple query string parameters from url', () => {
        expect(getUrl('/test/article.amp?first=1&second=2')).toEqual(
          'http://localhost/test/article.json',
        );
      });
    });

    afterAll(() => {
      delete process.env.SIMORGH_APP_ENV;
    });
  });
});
