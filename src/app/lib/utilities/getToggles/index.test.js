import {
  CONFIG_REQUEST_RECEIVED,
  CONFIG_FETCH_ERROR,
  CONFIG_ERROR,
} from '#lib/logger.const';
import nodeLogger from '#testHelpers/loggerMock';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = {
  toggles: {
    testToggle: { enabled: true },
  },
};

const mockDefaultToggles = {
  local: {
    enableFetchingToggles: { enabled: false },
    defaultToggle: { enabled: false },
  },
};

const fetchMock = fetch;

describe('getToggles', () => {
  beforeEach(async () => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
    fetchMock.mockResponse(JSON.stringify(mockResponse));
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetMocks();
    delete process.env.SIMORGH_CONFIG_URL;
  });

  it('should return defaultToggles if enableFetchingToggles is not enabled', async () => {
    jest.mock('#lib/config/toggles', () => mockDefaultToggles);

    // Dynamic import is used in these tests so the toggles file vales can be changed
    const getToggles = await import('.');
    const toggles = await getToggles.default('mundo');

    expect(toggles).toEqual(mockDefaultToggles.local);
  });

  describe('with enableFetchingToggles enabled', () => {
    beforeEach(() => {
      jest.mock('#lib/config/toggles', () => mockDefaultToggles);
    });

    it('should return the merged local and remote toggles and log that this happened', async () => {
      const getToggles = await import('.');
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      const toggles = await getToggles.default('mundo');

      console.log(nodeLogger.info.mock.calls);

      expect(nodeLogger.info).toHaveBeenCalledWith(CONFIG_REQUEST_RECEIVED, {
        service: 'mundo',
        url: mockUrl,
      });

      const expected = {
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      };

      console.debug({ toggles, expected });
      expect(toggles).toEqual(expected);
    });

    it('should return merged local toggles and cached toggles if cache entry exists', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };

      const getToggles = await import('.');
      const toggles = await getToggles.default('mundo', mockCache);

      const expected = {
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      };

      console.log({ toggles, expected });

      expect(toggles).toEqual(expected);
      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(
        'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost',
      );
    });

    it('should set cache entry if one does not exist for this URL', async () => {
      const mockCache = {
        get: jest.fn(() => undefined),
        set: jest.fn(),
      };

      const getToggles = await import('.');
      const toggles = await getToggles.default('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse.toggles);
    });

    it('should catch response errors, log them and return default toggles', async () => {
      fetchMock.mockResponseOnce({ status: 500 });

      const getToggles = await import('.');
      const toggles = await getToggles.default('pidgin');

      expect(nodeLogger.error).toHaveBeenCalledWith(CONFIG_FETCH_ERROR, {
        status: 500,
        service: 'pidgin',
      });
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should catch errors not related to the response, log them and return default toggles', async () => {
      const mockServiceUrl =
        'https://mock-config-endpoint?application=simorgh&service=hausa&__amp_source_origin=http://localhost';
      const mockInvalidResponse = 'This is not JSON';
      fetchMock.mockResponseOnce(mockInvalidResponse);

      const getToggles = await import('.');
      const toggles = await getToggles.default('hausa');

      expect(nodeLogger.error).toHaveBeenCalledWith(CONFIG_ERROR, {
        error: expect.stringContaining(
          'FetchError: invalid json response body',
        ),
        service: 'hausa',
        url: mockServiceUrl,
      });
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should calculate and log response time of toggles call when called on server', async () => {
      const getToggles = await import('.');
      const hrtTimeSpy = jest
        .spyOn(process, 'hrtime')
        .mockReturnValue([10, 1000]);
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      await getToggles.default('mundo');

      expect(hrtTimeSpy).toHaveBeenCalledTimes(2);
      expect(nodeLogger.info).toHaveBeenCalledTimes(2);
    });

    it('should not calculate and log response when running on client', async () => {
      const getToggles = await import('.');
      const hrtTimeSpy = jest.spyOn(process, 'hrtime');
      jest.spyOn(window, 'document', 'get').mockReturnValue({});

      await getToggles.default('mundo');

      expect(hrtTimeSpy).toHaveBeenCalledTimes(0);
      expect(nodeLogger.info).toHaveBeenCalledTimes(0);
    });
  });
});
