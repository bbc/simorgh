import loggerMock from '#testHelpers/loggerMock'; // Must be imported before getInitialData
import preprocess from '#lib/utilities/preprocessor';

jest.mock('#lib/utilities/preprocessor', () => jest.fn());
preprocess.mockImplementation(data => data);

const fetchData = require('./index').default;

describe('fetchData', () => {
  const mockSuccessfulResponse = { pageData: '12345' };

  const mockFetchSuccess = () =>
    fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

  const mockFetchFailure = () =>
    fetch.mockReject(JSON.stringify({ error: true }));

  const mockFetchInvalidJSON = () =>
    fetch.mockResponseOnce('Some Invalid: { JSON');

  const mockFetchNotFoundStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });

  const mockFetchTeapotStatus = () =>
    fetch.mockResponseOnce(JSON.stringify({}), { status: 418 });

  const expectedBaseUrl = 'http://localhost';
  const requestedPathname = '/path/to/asset';
  const expectedUrl = `${expectedBaseUrl}${requestedPathname}.json`;

  const callfetchData = async ({
    pathname = requestedPathname,
    preprocessorRules,
    mockFetch,
  }) => {
    if (mockFetch) {
      mockFetch();
    } else {
      mockFetchSuccess();
    }

    return fetchData({ pathname, preprocessorRules });
  };

  afterEach(() => {
    fetch.resetMocks();
    jest.clearAllMocks();
  });

  describe('Succesful fetch', () => {
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

      expect(preprocess).toHaveBeenCalledWith(response.pageData, undefined);

      expect(response).toEqual({
        pageData: {
          pageData: '12345',
        },
        status: 200,
      });
    });

    it('should pass preprocessorRules', async () => {
      const preprocessorRules = [() => {}];

      const response = await callfetchData({ preprocessorRules });

      expect(preprocess).toHaveBeenCalledWith(
        response.pageData,
        preprocessorRules,
      );

      expect(response).toEqual({
        pageData: {
          pageData: '12345',
        },
        status: 200,
      });
    });
  });

  describe('Rejected fetch', () => {
    it('should return an empty object', async () => {
      const response = await callfetchData({ mockFetch: mockFetchFailure });

      expect(preprocess).not.toHaveBeenCalled();

      expect(response).toEqual({
        data: undefined,
        status: 502,
      });
    });
  });

  describe('Request returns 200 status code, but invalid JSON', () => {
    it('should return a 502 error code', async () => {
      const response = await callfetchData({ mockFetch: mockFetchInvalidJSON });

      expect(preprocess).not.toHaveBeenCalled();

      expect(response).toEqual({
        data: undefined,
        status: 502,
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
        data: undefined,
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
        data: undefined,
        status: 502,
      });
    });
  });
});
