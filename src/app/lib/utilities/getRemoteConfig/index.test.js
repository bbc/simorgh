import fetchMock from 'fetch-mock';
import { CONFIG_REQUEST_RECEIVED, CONFIG_FETCH_ERROR } from '#lib/logger.const';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = { testToggle: { enabled: true } };
fetchMock.mock(mockUrl, mockResponse);

describe('getRemoteConfig', () => {
  beforeEach(async () => {
    jest.resetModules();
    await import('#testHelpers/loggerMock');
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
  });

  it('should return null if enableFetchingToggles is not enabled', async () => {
    jest.mock('#lib/config/toggles', () => ({
      local: {
        enableFetchingToggles: { enabled: false },
      },
    }));

    // Dynamic import is used in these tests so the toggles file values can be changed
    const getRemoteConfig = await import('.');
    const remoteToggles = await getRemoteConfig.default('mundo');

    expect(remoteToggles).toBe(null);
  });

  describe('with enableFetchingToggles enabled', () => {
    beforeEach(() => {
      jest.mock('#lib/config/toggles', () => ({
        local: {
          enableFetchingToggles: { enabled: true },
        },
      }));
    });

    it('should return the data received from the config enpoint and log that this happened', async () => {
      const nodeLogger = await import('#testHelpers/loggerMock');
      const getRemoteConfig = await import('.');
      const remoteToggles = await getRemoteConfig.default('mundo');

      expect(nodeLogger.default.info).toHaveBeenCalledWith(
        CONFIG_REQUEST_RECEIVED,
        {
          service: 'mundo',
          url: mockUrl,
        },
      );
      expect(remoteToggles).toEqual(mockResponse);
    });

    it('should return cache if it exists', async () => {
      const mockCache = {
        get: jest.fn(() => true),
      };

      const getRemoteConfig = await import('.');
      const remoteToggles = await getRemoteConfig.default('mundo', mockCache);

      expect(remoteToggles).toBe(true);
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

      const getRemoteConfig = await import('.');
      const remoteToggles = await getRemoteConfig.default('mundo', mockCache);

      expect(remoteToggles).toEqual(mockResponse);
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse);
    });

    it('should catch response errors, log it and return null', async () => {
      const errorCode = 500;
      const mockServiceUrl =
        'https://mock-config-endpoint?application=simorgh&service=pidgin&__amp_source_origin=http://localhost';
      fetchMock.mock(mockServiceUrl, errorCode);

      const nodeLogger = await import('#testHelpers/loggerMock');
      const getRemoteConfig = await import('.');
      const remoteToggles = await getRemoteConfig.default('pidgin');

      expect(nodeLogger.default.error).toHaveBeenCalledWith(
        CONFIG_FETCH_ERROR,
        {
          error: `Error: Unexpected response (HTTP status code ${errorCode}) when requesting ${mockServiceUrl}`,
          service: 'pidgin',
          url: mockServiceUrl,
        },
      );
      expect(remoteToggles).toBe(null);
    });
  });
});
