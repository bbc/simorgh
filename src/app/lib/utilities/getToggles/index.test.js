import fetchMock from 'fetch-mock';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';

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
    const remoteToggles = await getToggles.default('mundo');

    expect(remoteToggles).toBe(mockDefaultToggles.local);
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
      const remoteToggles = await getToggles.default('mundo');

      expect(nodeLogger.default.info).toHaveBeenCalledWith(
        CONFIG_REQUEST_RECEIVED,
        {
          service: 'mundo',
          url: mockUrl,
        },
      );
      expect(remoteToggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
    });

    it('should return merged local and cache if it exists', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };

      const getToggles = await import('.');
      const remoteToggles = await getToggles.default('mundo', mockCache);

      expect(remoteToggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(
        'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost',
      );
    });

    it('should set cache if it does not exists', async () => {
      const mockCache = {
        get: jest.fn(() => undefined),
        set: jest.fn(),
      };

      const getToggles = await import('.');
      const remoteToggles = await getToggles.default('mundo', mockCache);

      expect(remoteToggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse.toggles);
    });

    it('should catch response errors, log it and return null', async () => {
      const errorCode = 500;
      const mockServiceUrl =
        'https://mock-config-endpoint?application=simorgh&service=pidgin&__amp_source_origin=http://localhost';
      fetchMock.mock(mockServiceUrl, errorCode);

      const nodeLogger = await import('#testHelpers/loggerMock');
      const getToggles = await import('.');
      const remoteToggles = await getToggles.default('pidgin');

      expect(nodeLogger.default.error).toHaveBeenCalledWith(
        CONFIG_FETCH_ERROR,
        {
          error: `Error: Unexpected response (HTTP status code ${errorCode}) when requesting ${mockServiceUrl}`,
          service: 'pidgin',
          url: mockServiceUrl,
        },
      );
      expect(remoteToggles).toBe(mockDefaultToggles.local);
    });
  });
});
