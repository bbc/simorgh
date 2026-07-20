const mockUrl =
  'https://mock-toggles-endpoint?service=mundo&application=simorgh';
const mockResponse = {
  toggles: {
    testToggle: { enabled: true },
  },
};

describe('getToggles', () => {
  const originalTogglesBffPath = process.env.TOGGLES_BFF_PATH;

  const mockSuccessfulFetchResponse = {
    ok: true,
    status: 200,
    json: jest.fn(async () => mockResponse),
  };

  beforeEach(() => {
    process.env.TOGGLES_BFF_PATH = 'https://mock-toggles-endpoint';
    jest.spyOn(global, 'fetch').mockResolvedValue(mockSuccessfulFetchResponse);
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    process.env.TOGGLES_BFF_PATH = originalTogglesBffPath;
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
    const toggles = await getToggles.default({ service: 'mundo' });

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

      const toggles = await getToggles({ service: 'mundo' });

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
      const toggles = await getToggles({ service: 'mundo', cache: mockCache });

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.get).toHaveBeenCalledTimes(1);
      expect(mockCache.get).toHaveBeenCalledWith(
        'https://mock-toggles-endpoint?service=mundo&application=simorgh',
      );
    });

    it('should set cache entry if one does not exist for this URL', async () => {
      const mockCache = {
        get: jest.fn(() => undefined),
        set: jest.fn(),
      };

      const { default: getToggles } = await import('.');
      const toggles = await getToggles({ service: 'mundo', cache: mockCache });

      expect(toggles).toEqual({
        ...mockDefaultToggles.local,
        ...mockResponse.toggles,
      });
      expect(mockCache.set).toHaveBeenCalledTimes(1);
      expect(mockCache.set).toHaveBeenCalledWith(mockUrl, mockResponse.toggles);
    });

    it('should catch response errors, log them and return default toggles', async () => {
      const errorCode = 500;
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: errorCode,
        json: jest.fn(async () => mockResponse),
      });

      const { default: getToggles } = await import('.');
      const toggles = await getToggles('mundo');

      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    it('should catch errors not related to the response, log them and return default toggles', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn(async () => 'this is not json'),
      });

      const { default: getToggles } = await import('.');
      const toggles = await getToggles({ service: 'hausa' });
      expect(toggles).toEqual(mockDefaultToggles.local);
    });

    describe('when called', () => {
      describe('on server', () => {
        beforeEach(() => {
          jest.spyOn(window, 'location', 'get').mockImplementation(() => null);
        });

        it('should calculate and log response time', async () => {
          const { default: getToggles } = await import('.');

          const hrtTimeSpy = jest
            .spyOn(process, 'hrtime')
            .mockReturnValue([10, 1000]);

          await getToggles({ service: 'mundo' });

          expect(hrtTimeSpy).toHaveBeenCalledTimes(2);
        });
      });

      describe('on client', () => {
        beforeEach(() => {
          jest
            .spyOn(window, 'location', 'get')
            .mockImplementation(() => 'https://localhost');
        });
        it('should not calculate and log response time', async () => {
          const { default: getToggles } = await import('.');
          const hrtTimeSpy = jest.spyOn(process, 'hrtime');

          await getToggles({ service: 'mundo' });

          expect(hrtTimeSpy).toHaveBeenCalledTimes(0);
        });
      });
    });
  });
});
