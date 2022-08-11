import fetchMock from 'fetch-mock';
import {
  CONFIG_REQUEST_RECEIVED,
  CONFIG_FETCH_ERROR,
  CONFIG_ERROR,
} from '#lib/logger.const';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = {
  toggles: {
    testToggle: { enabled: true },
  },
};
fetchMock.mock(mockUrl, mockResponse);

describe('getToggles', () => {
  beforeEach(async () => {
    jest.resetModules();
    await import('#testHelpers/loggerMock');
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
  });

  afterEach(() => {
    jest.resetAllMocks();
    fetchMock.resetHistory();
  });

  it('should return defaultToggles if enableFetchingToggles is not enabled', async () => {
    const mockDefaultToggles = {
      local: {
        enableFetchingToggles: { enabled: false },
        defaultToggle: { enabled: false },
      },
    };
    jest.mock('#lib/config/toggles', () => mockDefaultToggles);

    // Dynamic import is used in these tests so the toggles file values can be changed
    const getToggles = await import('.');
    const toggles = await getToggles.default('mundo');

    expect(toggles).toEqual(mockDefaultToggles.local);
  });

  describe('with enableFetchingToggles enabled', () => {
    const mockDefaultToggles = {
      local: {
        enableFetchingToggles: { enabled: true },
        defaultToggle: { enabled: false },
      },
    };
    beforeEach(() => {
      jest.mock('#lib/config/toggles', () => mockDefaultToggles);
    });

    it('should return the merged local and remote toggles and log that this happened', async () => {
      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      const toggles = await getToggles.default('mundo');

      expect(nodeLogger.default.info).toHaveBeenCalledWith(
        CONFIG_REQUEST_RECEIVED,
        {
          service: 'mundo',
          url: mockUrl,
        },
      );

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
    });

    it('should return merged local toggles and cached toggles if cache entry exists', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };

      const getToggles = await import('.');
      const toggles = await getToggles.default('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(
        'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost',
      );
      expect(fetchMock.called()).toBe(false);
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
      const errorCode = 500;
      const mockServiceUrl =
        'https://mock-config-endpoint?application=simorgh&service=pidgin&__amp_source_origin=http://localhost';
      fetchMock.mock(mockServiceUrl, errorCode);

      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      const toggles = await getToggles.default('pidgin');

      expect(nodeLogger.default.error).toHaveBeenCalledWith(
        CONFIG_FETCH_ERROR,
        {
          status: 500,
          service: 'pidgin',
          url: mockServiceUrl,
        },
      );
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should catch errors not related to the response, log them and return default toggles', async () => {
      const mockServiceUrl =
        'https://mock-config-endpoint?application=simorgh&service=hausa&__amp_source_origin=http://localhost';
      const mockInvalidResponse = 'This is not JSON';
      fetchMock.mock(mockServiceUrl, mockInvalidResponse);

      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      const toggles = await getToggles.default('hausa');

      expect(nodeLogger.default.error).toHaveBeenCalledWith(CONFIG_ERROR, {
        error: expect.stringContaining(
          'FetchError: invalid json response body',
        ),
        service: 'hausa',
        url: mockServiceUrl,
      });
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should calculate and log response time of toggles call when called on server', async () => {
      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      const hrtTimeSpy = jest
        .spyOn(process, 'hrtime')
        .mockReturnValue([10, 1000]);
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      await getToggles.default('mundo');

      expect(fetchMock.calls().length).toBe(1);
      expect(hrtTimeSpy).toHaveBeenCalledTimes(2);
      expect(nodeLogger.default.info).toHaveBeenCalledTimes(2);
    });

    it('should not calculate and log response when running on client', async () => {
      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      const hrtTimeSpy = jest.spyOn(process, 'hrtime');
      jest.spyOn(window, 'document', 'get').mockReturnValue({});

      await getToggles.default('mundo');

      expect(fetchMock.calls().length).toBe(1);
      expect(hrtTimeSpy).toHaveBeenCalledTimes(0);
      expect(nodeLogger.default.info).toHaveBeenCalledTimes(0);
    });
  });
});
