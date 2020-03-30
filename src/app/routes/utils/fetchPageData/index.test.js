import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import loggerMock from '#testHelpers/loggerMock'; // Must be imported before fetchPageData
import fetchPageData, { getUrl } from '.';

const expectedBaseUrl = 'http://localhost';
const requestedPathname = '/path/to/asset';
const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;
const DATA_FETCH_ERROR = 'data_fetch_error';

const asErrorString = message => {
  return { error: message };
};

afterEach(() => {
  jest.clearAllMocks();
  fetch.resetMocks();
});

describe('fetchPageData', () => {
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
      await fetchPageData(requestedPathname);

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call fetch on amp pages without .amp in pathname', async () => {
      await fetchPageData(requestedPathname);

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return expected response', async () => {
      const response = await fetchPageData(requestedPathname);

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
    it('should return handle a rejected fetch', async () => {
      fetch.mockReject('TypeError: Failed to fetch');
      const response = await fetchPageData(requestedPathname);

      expect(response).toEqual({
        status: 502,
        error: 'TypeError: Failed to fetch',
      });
    });
  });

  describe('Request returns 200 status code, but invalid JSON', () => {
    afterAll(() => {
      resetWindowValue('location', window.location);
    });
    fetch.mockResponse('Some Invalid JSON');

    describe('on server', () => {
      it('should return a 500 error code', async () => {
        setWindowValue('location', false);

        const response = await fetchPageData(requestedPathname);

        expect(loggerMock.error).toBeCalledWith(
          DATA_FETCH_ERROR,
          asErrorString(
            'FetchError: invalid json response body at  reason: Unexpected end of JSON input',
          ),
        );

        expect(response).toEqual({
          error:
            'FetchError: invalid json response body at  reason: Unexpected end of JSON input',
          status: 500,
        });
      });
    });

    describe('on client', () => {
      it('should return a 502 error code', async () => {
        setWindowValue('location', true);

        const response = await fetchPageData(requestedPathname);

        expect(loggerMock.error).toBeCalledWith(
          DATA_FETCH_ERROR,
          asErrorString(
            'FetchError: invalid json response body at  reason: Unexpected end of JSON input',
          ),
        );
        expect(response).toEqual({
          error:
            'FetchError: invalid json response body at  reason: Unexpected end of JSON input',
          status: 502,
        });
      });
    });
  });

  describe('Request returns a 404 status code', () => {
    it('should return the status code as 404', async () => {
      fetch.mockResponse('Not found', { status: 404 });

      const response = await fetchPageData(requestedPathname);

      expect(response).toEqual({
        status: 404,
      });
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

        const response = await fetchPageData(requestedPathname);

        expect(loggerMock.error).toBeCalledWith(
          DATA_FETCH_ERROR,
          asErrorString(
            `Error: Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
          ),
        );

        expect(response).toEqual({
          status: 500,
          error: `Error: Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
        });
      });

      it('should log, and propogate the status code as 500', async () => {
        fetch.mockResponse('Error', { status: 500 });

        const response = await fetchPageData(requestedPathname);

        expect(loggerMock.error).toBeCalledWith(
          DATA_FETCH_ERROR,
          asErrorString(
            `Error: Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
          ),
        );

        expect(response).toEqual({
          status: 500,
          error: `Error: Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
        });
      });
    });
  });
  describe('on client', () => {
    beforeEach(() => {
      setWindowValue('location', true);
    });

    it('should log, and return the status code as 502', async () => {
      fetch.mockResponse("I'm a teapot", { status: 418 });

      const response = await fetchPageData(requestedPathname);

      expect(loggerMock.error).toBeCalledWith(
        DATA_FETCH_ERROR,
        asErrorString(
          `Error: Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
        ),
      );

      expect(response).toEqual({
        status: 502,
        error: `Error: Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
      });
    });

    it('should log, and propogate the status code as 502', async () => {
      fetch.mockResponse('Internal server error', { status: 500 });

      const response = await fetchPageData(requestedPathname);

      expect(loggerMock.error).toBeCalledWith(
        DATA_FETCH_ERROR,
        asErrorString(
          `Error: Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
        ),
      );

      expect(response).toEqual({
        status: 502,
        error: `Error: Unexpected upstream response (HTTP status code 500) when requesting ${expectedUrl}`,
      });
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
