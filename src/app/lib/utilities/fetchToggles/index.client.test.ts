import { Toggles } from '#app/models/types/global';

jest.mock('#utilities/getAgent');

const remoteToggles = {
  testToggle: { enabled: true },
};

const mockSuccessfulFetchResponse = {
  ok: true,
  status: 200,
  json: jest.fn(async () => ({ data: { toggles: remoteToggles } })),
};

const trackedEnvVars = [
  'TOGGLES_BFF_PATH',
  'SIMORGH_APP_ENV',
  'TOGGLES_SERVICE_ENV',
  'WEB_CDN_URL',
] as const;

type EnvSnapshot = Record<(typeof trackedEnvVars)[number], string | undefined>;

const snapshotEnv = (): EnvSnapshot =>
  Object.fromEntries(
    trackedEnvVars.map(key => [key, process.env[key]]),
  ) as EnvSnapshot;

const restoreEnv = (snapshot: EnvSnapshot) => {
  trackedEnvVars.forEach(key => {
    const value = snapshot[key];

    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  });
};

describe('fetchToggles', () => {
  const envSnapshot = snapshotEnv();

  beforeEach(() => {
    process.env.TOGGLES_BFF_PATH = 'https://mock-toggles-endpoint';
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(mockSuccessfulFetchResponse as unknown as Response);
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    restoreEnv(envSnapshot);
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

    const { default: fetchToggles } = await import('./index');
    const toggles = await fetchToggles({ service: 'mundo' });

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
      const { default: fetchToggles } = await import('./index');

      const toggles = await fetchToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual({
        ...mockDefaultToggleDefinitions,
        ...remoteToggles,
      });
    });

    it('should let remote toggles override local toggles of the same name', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn(async () => ({
          data: { toggles: { defaultToggle: { enabled: true } } },
        })),
      } as unknown as Response);

      const { default: fetchToggles } = await import('./index');

      const toggles = await fetchToggles({ service: 'mundo' });

      expect(toggles.defaultToggle).toEqual({ enabled: true });
    });

    it('should fetch the AMP toggles endpoint when isAmp is true', async () => {
      process.env.WEB_CDN_URL = 'https://mock-cdn';

      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await fetchToggles({ service: 'mundo', isAmp: true });

      const [calledUrl] = (global.fetch as jest.Mock).mock.calls[0];

      expect(calledUrl).toContain('https://mock-cdn/fd/ws-toggles');
      expect(calledUrl).toContain('service=mundo');
    });

    it('should return default toggles when the toggles endpoint cannot be constructed', async () => {
      delete process.env.TOGGLES_BFF_PATH;

      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      const toggles = await fetchToggles({ service: 'mundo' });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should only fetch once for repeated calls with the same endpoint and environment when not local', async () => {
      process.env.SIMORGH_APP_ENV = 'live';
      jest.mock('#lib/config/toggles', () => ({
        ...mockDefaultToggles,
        live: mockDefaultToggles.local,
      }));

      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await fetchToggles({ service: 'mundo' });
      const cachedToggles = await fetchToggles({
        service: 'mundo',
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(cachedToggles).toEqual({
        ...mockDefaultToggleDefinitions,
        ...remoteToggles,
      });
    });

    it('should bypass the cache and fetch on every call when running locally', async () => {
      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await fetchToggles({ service: 'mundo' });
      await fetchToggles({ service: 'mundo' });

      expect(global.fetch).toHaveBeenCalledTimes(2);
    });

    it('should send the ctx-service-env header from TOGGLES_SERVICE_ENV when running locally', async () => {
      process.env.TOGGLES_SERVICE_ENV = 'live';

      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await fetchToggles({ service: 'mundo' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { 'ctx-service-env': 'live' },
        }),
      );
    });

    it('should send the ctx-service-env header with environment when running in test', async () => {
      process.env.SIMORGH_APP_ENV = 'test';
      jest.mock('#lib/config/toggles', () => ({
        local: mockDefaultToggleDefinitions,
        test: {
          _environment: 'test',
          enableFetchingToggles: { enabled: true },
          defaultToggle: { enabled: false },
        },
      }));

      const { default: fetchToggles } = await import('./index');
      (global.fetch as jest.Mock).mockClear();

      await fetchToggles({ service: 'mundo' });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: { 'ctx-service-env': 'test' },
        }),
      );
    });

    it('should return default toggles when the response is not ok', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn(async () => ({ toggles: remoteToggles })),
      } as unknown as Response);

      const { default: fetchToggles } = await import('./index');
      const toggles = await fetchToggles({
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

      const { default: fetchToggles } = await import('./index');
      const toggles = await fetchToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
    });

    it('should catch fetch errors, log them and return default toggles', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('network error'),
      );

      const { default: fetchToggles } = await import('./index');
      const toggles: Toggles = await fetchToggles({
        service: 'mundo',
      });

      expect(toggles).toEqual(mockDefaultToggleDefinitions);
    });
  });
});

describe('fetchToggles - Console logging behavior', () => {
  const mockDefaultToggles = {
    local: {
      _environment: 'local',
      enableFetchingToggles: { enabled: true },
      defaultToggle: { enabled: false },
    },
    test: {
      _environment: 'test',
      enableFetchingToggles: { enabled: true },
      defaultToggle: { enabled: false },
    },
    live: {
      _environment: 'live',
      enableFetchingToggles: { enabled: true },
      defaultToggle: { enabled: false },
    },
  };

  const envSnapshot = snapshotEnv();

  let consoleInfoSpy: jest.SpyInstance | undefined;
  let consoleWarnSpy: jest.SpyInstance | undefined;

  beforeEach(() => {
    process.env.TOGGLES_BFF_PATH = 'https://mock-toggles-endpoint';
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(mockSuccessfulFetchResponse as unknown as Response);

    consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    jest.mock('#lib/config/toggles', () => mockDefaultToggles);
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
    consoleInfoSpy?.mockRestore();
    consoleWarnSpy?.mockRestore();
    restoreEnv(envSnapshot);
  });

  describe('Console output in non-local environments', () => {
    it('should have no [dev:toggles] console output in test environment', async () => {
      process.env.SIMORGH_APP_ENV = 'test';
      jest.mock('#lib/config/toggles', () => ({
        ...mockDefaultToggles,
        test: mockDefaultToggles.test,
      }));

      const { default: fetchToggles } = await import('./index');
      consoleInfoSpy?.mockClear();
      consoleWarnSpy?.mockClear();

      await fetchToggles({ service: 'mundo' });

      const consoleInfoCalls = consoleInfoSpy?.mock.calls || [];
      const consoleWarnCalls = consoleWarnSpy?.mock.calls || [];

      const hasDevTogglesInfo = consoleInfoCalls.some(call =>
        call.some(
          arg => typeof arg === 'string' && arg.includes('[dev:toggles]'),
        ),
      );
      const hasDevTogglesWarn = consoleWarnCalls.some(call =>
        call.some(
          arg => typeof arg === 'string' && arg.includes('[dev:toggles]'),
        ),
      );

      expect(hasDevTogglesInfo).toBe(false);
      expect(hasDevTogglesWarn).toBe(false);
    });

    it('should have no [dev:toggles] console output in production', async () => {
      process.env.SIMORGH_APP_ENV = 'live';
      jest.mock('#lib/config/toggles', () => ({
        ...mockDefaultToggles,
        live: mockDefaultToggles.live,
      }));

      const { default: fetchToggles } = await import('./index');
      consoleInfoSpy?.mockClear();
      consoleWarnSpy?.mockClear();

      await fetchToggles({ service: 'mundo' });

      const consoleInfoCalls = consoleInfoSpy?.mock.calls || [];
      const consoleWarnCalls = consoleWarnSpy?.mock.calls || [];

      const hasDevTogglesInfo = consoleInfoCalls.some(call =>
        call.some(
          arg => typeof arg === 'string' && arg.includes('[dev:toggles]'),
        ),
      );
      const hasDevTogglesWarn = consoleWarnCalls.some(call =>
        call.some(
          arg => typeof arg === 'string' && arg.includes('[dev:toggles]'),
        ),
      );

      expect(hasDevTogglesInfo).toBe(false);
      expect(hasDevTogglesWarn).toBe(false);
    });
  });

  it('should log [dev:toggles] console output when running locally', async () => {
    const { default: fetchToggles } = await import('./index');
    consoleInfoSpy?.mockClear();

    await fetchToggles({ service: 'mundo' });

    const consoleInfoCalls = consoleInfoSpy?.mock.calls || [];
    const hasDevTogglesInfo = consoleInfoCalls.some(call =>
      call.some(
        arg => typeof arg === 'string' && arg.includes('[dev:toggles]'),
      ),
    );

    expect(hasDevTogglesInfo).toBe(true);
  });
});
