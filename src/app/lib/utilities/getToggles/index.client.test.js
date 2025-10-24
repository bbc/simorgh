import * as onClient from '#lib/utilities/onClient';

const mockUrl =
  'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
const mockResponse = {
  toggles: {
    testToggle: { enabled: true },
  },
};

jest.mock('#lib/utilities/onClient', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const onClientSpy = jest.spyOn(onClient, 'default');

describe('getToggles', () => {
  const originalConfigURL = process.env.SIMORGH_CONFIG_URL;

  beforeEach(() => {
    process.env.SIMORGH_CONFIG_URL = 'https://mock-config-endpoint';
    fetch.mockResponse(JSON.stringify(mockResponse));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    fetch.resetMocks();
    process.env.SIMORGH_CONFIG_URL = originalConfigURL;
    onClientSpy.mockClear();
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

    it('should return the merged local and remote toggles', async () => {
      const { default: getToggles } = await import('.');

      const toggles = await getToggles('mundo');

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
    });

    it('should return merged local toggles and cached toggles if cache entry exists', async () => {
      const mockCache = {
        get: jest.fn(() => mockResponse.toggles),
      };

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo', mockCache);

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
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
        ...mockDefaultToggles.local,
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

      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should catch errors not related to the response, log them and return default toggles', async () => {
      const mockInvalidResponse = 'This is not JSON';
      fetch.mockResponseOnce(mockInvalidResponse);

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('hausa');
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    describe('when called', () => {
      describe('on server', () => {
        it('should calculate and log response time', async () => {
          const { default: getToggles } = await import('.');

          const hrtTimeSpy = jest
            .spyOn(process, 'hrtime')
            .mockReturnValue([10, 1000]);

          await getToggles('mundo');

          expect(hrtTimeSpy).toHaveBeenCalledTimes(2);
        });
      });

      describe('on client', () => {
        beforeEach(() => {
          onClientSpy.mockImplementation(() => true);
        });

        it('should not calculate and log response time', async () => {
          const { default: getToggles } = await import('.');
          const hrtTimeSpy = jest.spyOn(process, 'hrtime');

          await getToggles('mundo');

          expect(hrtTimeSpy).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
