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

  describe('With RAZZLE_BASE_PATH www.test.bbc.com/', () => {
    const BASE_PATH = 'https://test.com';
    describe('On client', () => {
      beforeEach(() => {
        process.env = {};
        process.env.RAZZLE_BASE_PATH = BASE_PATH;
      });

      it('should call fetch with a relative URL', () => {
        callGetInitialData();
        expect(fetch.mock.calls[0][0]).toEqual(
          `/${defaultServiceParam}/articles/${defaultIdParam}.json`,
        );
      });
    });

    describe('On Server', () => {
      beforeEach(() => {
        process.env.NODE = true;
      });

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialData();
        expect(fetch.mock.calls[0][0]).toEqual(
          `${BASE_PATH}/${defaultServiceParam}/articles/${defaultIdParam}.json`,
        );
      });
    });
  });

  describe('With RAZZLE_BASE_PATH localhost:7080', () => {
    const BASE_PATH = 'http://localhost:7080';
    describe('On client', () => {
      beforeEach(() => {
        process.env = {};
        process.env.RAZZLE_BASE_PATH = BASE_PATH;
      });

      it('should call fetch with a relative URL', () => {
        callGetInitialData();
        expect(fetch.mock.calls[0][0]).toEqual(
          `/data/${defaultServiceParam}/${defaultIdParam}.json`,
        );
      });
    });

    describe('On Server', () => {
      beforeEach(() => {
        process.env.NODE = true;
        process.env.RAZZLE_BASE_PATH = BASE_PATH;
      });

      it('should call fetch with an absolute URL using BASE_PATH environment variable', () => {
        callGetInitialData();
        expect(fetch.mock.calls[0][0]).toEqual(
          `${BASE_PATH}/data/${defaultServiceParam}/${defaultIdParam}.json`,
        );
      });
    });
  });

  describe('Rejected fetch', () => {
    it('should return an empty object', async () => {
      const response = await callGetInitialData({}, mockFetchFailure);
      expect(response).toEqual({});
    });
  });
});
