import fetchMock from 'fetch-mock';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = { ads: { enabled: true } };
fetchMock.mock(mockUrl, mockResponse);

describe('getRemoteConfig', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
  });

  it('should return null if enableFetchingToggles is not enabled', async () => {
    jest.mock('#lib/config/toggles', () => ({
      local: {
        enableFetchingToggles: { enabled: false },
      },
    }));

    const getRemoteConfig = await import('./index');
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

    it('should return the data received from the config enpoint', async () => {
      const getRemoteConfig = await import('./index');
      const remoteToggles = await getRemoteConfig.default('mundo');

      expect(remoteToggles).toEqual(mockResponse);
    });

    it('should return cache if it exists', async () => {
      const mockCache = {
        get: jest.fn(() => true),
      };

      const getRemoteConfig = await import('./index');
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

      const getRemoteConfig = await import('./index');
      const remoteToggles = await getRemoteConfig.default('mundo', mockCache);

      expect(remoteToggles).toEqual(mockResponse);
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse);
    });

    it('should catch response errors and return null', async () => {
      const errorCode = 500;
      fetchMock.mock(
        'https://mock-config-endpoint?application=simorgh&service=pidgin&__amp_source_origin=http://localhost',
        errorCode,
      );

      const getRemoteConfig = await import('./index');
      const remoteToggles = await getRemoteConfig.default('pidgin');

      expect(remoteToggles).toBe(null);
    });
  });
});
