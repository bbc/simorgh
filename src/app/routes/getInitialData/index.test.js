import getInitialData from './index';
import * as isServer from '../../helpers/isServer';

describe('getInitialData', () => {
  const defaultIdParam = 'c0000000001o';
  const defaultServiceParam = 'news';
  const defaultContext = {
    match: {
      params: {
        id: defaultIdParam,
        service: defaultServiceParam,
      },
    },
  };
  const mockSuccessfulResponse = { data: '12345' };

  const mockFetchSuccess = () =>
    fetch.mockResponseOnce(JSON.stringify(mockSuccessfulResponse));

  const mockFetchFailure = () =>
    fetch.mockReject(JSON.stringify({ error: true }));

  const callGetInitialData = async (
    context = defaultContext,
    mockFetch = mockFetchSuccess,
  ) => {
    mockFetch();
    const response = await getInitialData(context);
    return response;
  };

  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return the fetch response', async () => {
    const response = await callGetInitialData();
    expect(response).toEqual({
      amp: false,
      data: mockSuccessfulResponse,
      service: 'news',
    });
  });

  describe('On client', () => {
    it('should call fetch with a relative URL', () => {
      isServer.default = jest.fn().mockReturnValueOnce(false);

      callGetInitialData();
      expect(fetch.mock.calls[0][0]).toEqual(
        `/data/${defaultServiceParam}/${defaultIdParam}.json`,
      );
    });
  });

  describe('Validate route parameter ', () => {
    it('checks the id is invalid before returning an empty object', async () => {
      jest.spyOn(global.console, 'log');
      const invalidIdParam = 'route-21';
      const invalidContext = {
        match: {
          params: {
            id: invalidIdParam,
            service: defaultServiceParam,
          },
        },
      };
      const response = await callGetInitialData(invalidContext);

      expect(fetch).not.toHaveBeenCalled();

      /* eslint-disable no-console */
      expect(console.log).toBeCalledWith(
        new Error(
          `Invalid route parameter: ${invalidIdParam}. ID parameter must be in format 'c[xxxxxxxxxx]o', where the middle part could be 0000000001 to 0000000027.`,
        ),
      );
      /* eslint-enable no-console */

      expect(response).toEqual({});
    });

    it('checks the service is invalid before returning an empty object', async () => {
      jest.spyOn(global.console, 'log');
      const invalidServiceParam = 'route-21';
      const invalidContext = {
        match: {
          params: { id: 'c0000000027o', service: invalidServiceParam },
        },
      };
      const response = await callGetInitialData(invalidContext);

      expect(fetch).not.toHaveBeenCalled();

      /* eslint-disable no-console */
      expect(console.log).toBeCalledWith(
        new Error(
          `Invalid route parameter: ${invalidServiceParam}. Service parameter must be news or persian.`,
        ),
      );
      /* eslint-enable no-console */

      expect(response).toEqual({});
    });
  });

  describe('On Server', () => {
    const BASE_PATH = 'https://test.com';
    process.env.RAZZLE_BASE_PATH = BASE_PATH;

    it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
      isServer.default = jest.fn().mockReturnValueOnce(true);

      callGetInitialData();
      expect(fetch.mock.calls[0][0]).toEqual(
        `${BASE_PATH}/data/${defaultServiceParam}/${defaultIdParam}.json`,
      );
    });
  });

  describe('Rejected fetch', () => {
    it('should return an empty object', async () => {
      const response = await callGetInitialData({}, mockFetchFailure);
      expect(response).toEqual({});
    });
  });
});
