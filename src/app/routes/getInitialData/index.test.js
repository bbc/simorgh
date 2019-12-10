import loggerMock from '#testHelpers/loggerMock'; // Must be imported before getInitialData
import preprocess from '#lib/utilities/preprocessor';
import getPreprocessorRules from './utils/getPreprocessorRules';

jest.mock('#lib/utilities/preprocessor', () => jest.fn());
preprocess.mockImplementation(data => data);

const fetchData = require('./index').default;
const { getUrl } = require('./index');

describe('fetchData', () => {
  const mockSuccessfulResponse = {
    metadata: {},
    content: {},
    promo: {},
  };

  const mockFetchSuccess = () =>
    fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

  const mockFetchSuccessWithData = data =>
    fetch.mockResponseOnce(JSON.stringify(data));

  const mockFetchFailure = () => fetch.mockReject(true);

  const mockFetchInvalidJSON = () => fetch.mockReject('Some Invalid: { JSON');

  const mockFetchNotFoundStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

  const mockFetchTeapotStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 418 });

  const expectedBaseUrl = 'http://localhost';
  const requestedPathname = '/path/to/asset';
  const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;

  const callfetchData = ({ pathname = requestedPathname, mockFetch }) => {
    if (mockFetch) {
      mockFetch();
    } else {
      mockFetchSuccess();
    }

    return fetchData(pathname);
  };

  afterEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  describe('Successful fetch', () => {
    it('should call fetch with correct url', async () => {
      await callfetchData({});

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should call fetch on amp pages without .amp in pathname', async () => {
      await callfetchData({ pathname: `${requestedPathname}.amp` });

      expect(fetch).toHaveBeenCalledWith(expectedUrl);
    });

    it('should return an empty object', async () => {
      const response = await callfetchData({});

      expect(preprocess).toHaveBeenCalledWith(response.pageData, []);

      expect(response).toEqual({
        pageData: mockSuccessfulResponse,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: article', async () => {
      const mockData = {
        metadata: {
          type: 'article',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('article');

      const response = await callfetchData(
        '/news/articles/c0123456789o',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: WS-LIVE', async () => {
      const mockData = {
        metadata: {
          type: 'WS-LIVE',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('WS-LIVE');

      const response = await callfetchData(
        '/korean/bbc_korean_radio/liveradio',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: IDX', async () => {
      const mockData = {
        metadata: {
          type: 'IDX',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('IDX');

      const response = await callfetchData(
        '/igbo',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: FIX', async () => {
      const mockData = {
        metadata: {
          type: 'FIX',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('FIX');

      const response = await callfetchData(
        '/afrique/48465371',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: MAP', async () => {
      const mockData = {
        metadata: {
          type: 'MAP',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('MAP');

      const response = await callfetchData(
        '/pidgin/tori-49450859',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: STY', async () => {
      const mockData = {
        metadata: {
          type: 'STY',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('STY');

      const response = await callfetchData(
        '/pidgin/world-23252817',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessorRules for type: PGL', async () => {
      const mockData = {
        metadata: {
          type: 'PGL',
        },
      };
      const expectedPreprocessorRules = getPreprocessorRules('PGL');

      const response = await callfetchData(
        '/japanese/world-23252856',
        mockFetchSuccessWithData(mockData),
      );

      expect(await preprocess).toHaveBeenCalledWith(
        response.pageData,
        expectedPreprocessorRules,
      );

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessor rules as empty array for type: foobar', async () => {
      const mockData = {
        metadata: {
          type: 'foobar',
        },
      };

      const response = await callfetchData(
        '/foobar',
        mockFetchSuccessWithData(mockData),
      );
      expect(await preprocess).toHaveBeenCalledWith(response.pageData, []);

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });

    it('should pass preprocessor rules as empty array for type: undefined', async () => {
      const mockData = {
        metadata: {},
      };

      const response = await callfetchData(
        '/foobar',
        mockFetchSuccessWithData(mockData),
      );
      expect(await preprocess).toHaveBeenCalledWith(response.pageData, []);

      expect(response).toEqual({
        pageData: mockData,
        status: 200,
      });
    });
  });

  describe('Rejected fetch', () => {
    it('should return an empty object', async () => {
      const response = await callfetchData({ mockFetch: mockFetchFailure });

      expect(preprocess).not.toHaveBeenCalled();

      expect(response).toEqual({
        status: 502,
        error: true,
      });
    });
  });

  describe('Request returns 200 status code, but invalid JSON', () => {
    it('should return a 502 error code', async () => {
      const response = await callfetchData({
        mockFetch: mockFetchInvalidJSON,
      });

      expect(preprocess).not.toHaveBeenCalled();

      expect(response).toEqual({
        status: 502,
        error: 'Some Invalid: { JSON',
      });
    });
  });

  describe('Request returns a 404 status code', () => {
    it('should return the status code as 404', async () => {
      const response = await callfetchData({
        mockFetch: mockFetchNotFoundStatus,
      });

      expect(preprocess).not.toHaveBeenCalled();

      expect(response).toEqual({
        status: 404,
      });
    });
  });

  describe('Request returns a non-200, non-404 status code', () => {
    it('should log, and return the status code as 502', async () => {
      const response = await callfetchData({
        mockFetch: mockFetchTeapotStatus,
      });

      expect(preprocess).not.toHaveBeenCalled();

      expect(loggerMock.warn).toBeCalledWith(
        `Unexpected upstream response (HTTP status code 418) when requesting ${expectedUrl}`,
      );

      expect(response).toEqual({
        status: 502,
        error: Error(),
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
        process.env.APP_ENV = 'not-live';
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
        process.env.APP_ENV = 'live';
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
      process.env.APP_ENV = undefined;
    });
  });
});
