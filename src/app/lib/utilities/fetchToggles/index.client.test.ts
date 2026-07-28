import { Toggles } from '#app/models/types/global';

jest.mock('#utilities/getAgent');

const remoteToggles = {
  testToggle: { enabled: true },
};

describe('getToggles', () => {
  const originalTogglesBffPath = process.env.TOGGLES_BFF_PATH;

  const mockSuccessfulFetchResponse = {
    ok: true,
    status: 200,
    json: jest.fn(async () => ({ toggles: remoteToggles })),
  };

  beforeEach(() => {
    process.env.TOGGLES_BFF_PATH = 'https://mock-toggles-endpoint';
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(mockSuccessfulFetchResponse as unknown as Response);
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    process.env.TOGGLES_BFF_PATH = originalTogglesBffPath;
  });

  it('should return defaultToggles if enableFetchingToggles is not enabled', async () => {
    const mockDefaultToggles = {
      local: {
        _environment: 'local',
        enableFetchingToggles: { enabled: false },
        defaultToggle: { enabled: false },
      },
    };
    jest.mock('#lib/config/toggles', () => mockDefaultToggles);

    const { default: getToggles } = await import('./index');
    const toggles = await getToggles({ service: 'mundo' });

    expect(toggles).toEqual({
      enableFetchingToggles: { enabled: false },
      defaultToggle: { enabled: false },
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  describe('with enableFetchingToggles enabled', () => {
    const mockDefaultToggles = {
      local: {
        _environment: 'local',
        enableFetchingToggles: { enabled: true },
        defaultToggle: { enabled: false },
      },
    };
    const mockDefaultToggleDefinitions = {
      enableFetchingToggles: { enabled: true },
      defaultToggle: { enabled: false },
    };

    beforeEach(() => {
      jest.mock('#lib/config/toggles', () => mockDefaultToggles);
    });

    it('should return the merged local and remote toggles', async () => {
      const { default: getToggles } = await import('./index');

      const toggles = await getToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual({
        ...mockDefaultToggleDefinitions,
        ...remoteToggles,
      });
    });

    it('should support a nested data.toggles response shape', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn(async () => ({ data: { toggles: remoteToggles } })),
      } as unknown as Response);

      const { default: getToggles } = await import('./index');
      const toggles = await getToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual({
        ...mockDefaultToggleDefinitions,
        ...remoteToggles,
      });
    });

    it('should only fetch once for repeated calls with the same endpoint and environment', async () => {
      const { default: getToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await getToggles({ service: 'mundo' });
      const cachedToggles = await getToggles({
        service: 'mundo',
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(cachedToggles).toEqual({
        ...mockDefaultToggleDefinitions,
        ...remoteToggles,
      });
    });

    it('should return default toggles when the response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn(async () => ({ toggles: remoteToggles })),
      } as unknown as Response);

      const { default: getToggles } = await import('./index');
      const toggles = await getToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
    });

    it('should return default toggles when the response body has no toggles', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn(async () => ({})),
      } as unknown as Response);

      const { default: getToggles } = await import('./index');
      const toggles = await getToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
    });

    it('should catch fetch errors, log them and return default toggles', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('network error'),
      );

      const { default: getToggles } = await import('./index');
      const toggles: Toggles = await getToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
    });
  });
});
