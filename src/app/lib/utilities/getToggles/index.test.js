import * as isLocal from '../isLocal';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = {
  toggles: {
    testToggle: { enabled: true },
  },
};

const isLocalSpy = jest.spyOn(isLocal, 'default');
isLocalSpy.mockImplementation(() => true);

describe('getToggles', () => {
  beforeEach(async () => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
    fetch.mockResponse(JSON.stringify(mockResponse));
  });

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
    fetch.resetMocks();
  });

  it('should return defaultToggles if enableFetchingToggles is not enabled', async () => {
    const mockDefaultToggles = {
      enableFetchingToggles: { enabled: false },
      localToggle: { enabled: false },
    };
    jest.mock('#lib/config/toggles', () => mockDefaultToggles);

    // Dynamic import is used in these tests so the toggles file values can be changed
    const getToggles = await import('.');
    const toggles = await getToggles.default('mundo');

    expect(toggles).toEqual(mockDefaultToggles.local);
  });

  describe('with enableFetchingToggles enabled', () => {
    const mockDefaultToggles = {
      enableFetchingToggles: { enabled: true },
      localToggle: { enabled: false },
    };

    beforeEach(() => {
      jest.mock('#lib/config/toggles', () => mockDefaultToggles);
    });

    it('should return the merged local and remote toggles when environment is local', async () => {
      const { default: getToggles } = await import('.');
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      const toggles = await getToggles('mundo');

      expect(toggles).toEqual({
        ...mockDefaultToggles,
        ...mockResponse.toggles,
      });
    });

    it('should not merge local toggles when environment is not local', async () => {
      const { default: getToggles } = await import('.');
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);
      isLocalSpy.mockImplementationOnce(() => false);

      const toggles = await getToggles('mundo');

      expect(toggles).toEqual({
        ...mockResponse.toggles,
      });
    });

    it('should return merged local toggles and cached toggles if cache entry exists when environment is local', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockDefaultToggles,
        ...mockResponse.toggles,
      });
      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(
        'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost',
      );
    });

    it('should not merge local toggles but should return cached toggles if cache entry exists when environment is not local', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };
      isLocalSpy.mockImplementationOnce(() => false);

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockResponse.toggles,
      });
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

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockDefaultToggles,
        ...mockResponse.toggles,
      });
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse.toggles);
    });

    it('should catch response errors, log them and return default toggles', async () => {
      const errorCode = 500;
      fetch.mockResponseOnce(errorCode);

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo');

      expect(toggles).toEqual(mockDefaultToggles);
    });

    it('should catch errors not related to the response, log them and return default toggles', async () => {
      const mockInvalidResponse = 'This is not JSON';
      fetch.mockResponseOnce(mockInvalidResponse);

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('hausa');
      expect(toggles).toEqual(mockDefaultToggles);
    });

    it('should calculate and log response time of toggles call when called on server', async () => {
      const { default: getToggles } = await import('.');

      const hrtTimeSpy = jest
        .spyOn(process, 'hrtime')
        .mockReturnValue([10, 1000]);
      jest.spyOn(window, 'document', 'get').mockReturnValue(undefined);

      await getToggles('mundo');

      expect(hrtTimeSpy).toHaveBeenCalledTimes(2);
    });

    it('should not calculate and log response when running on client', async () => {
      const { default: getToggles } = await import('.');
      const hrtTimeSpy = jest.spyOn(process, 'hrtime');
      jest.spyOn(window, 'document', 'get').mockReturnValue({});

      await getToggles('mundo');

      expect(hrtTimeSpy).toHaveBeenCalledTimes(0);
    });
  });
});
