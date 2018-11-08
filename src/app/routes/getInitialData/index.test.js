import getInitialData from './index';

describe('getInitialData', () => {
  const defaultIdParam = 'c0000000001o';
  const defaultServiceParam = 'news';
  const defaultAmpParam = '';
  const defaultContext = {
    match: {
      params: {
        id: defaultIdParam,
        service: defaultServiceParam,
        amp: defaultAmpParam,
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
      isAmp: false,
      data: mockSuccessfulResponse,
      service: 'news',
    });
  });

  it('should return an amp value of true, when .amp passed in context params', async () => {
    const contextWithAmp = {
      match: {
        params: {
          id: defaultIdParam,
          service: defaultServiceParam,
          amp: '.amp',
        },
      },
    };

    const response = await callGetInitialData(contextWithAmp);
    expect(response).toEqual({
      isAmp: true,
      data: mockSuccessfulResponse,
      service: 'news',
    });
  });

  describe('using test base path', () => {
    const BASE_PATH = 'https://www.test.com';
    beforeEach(() => {
      process.env.RAZZLE_BASE_PATH = BASE_PATH;
    });
    it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
      callGetInitialData();
      expect(fetch.mock.calls[0][0]).toEqual(
        `${BASE_PATH}/${defaultServiceParam}/articles/${defaultIdParam}.json`,
      );
    });
  });

  describe('Rejected fetch', () => {
    it('should throw an error', async () => {
      const response = await callGetInitialData({}, mockFetchFailure);
      expect(response).toThrowError(`TypeError: Failed to fetch`);
    });
  });
});
