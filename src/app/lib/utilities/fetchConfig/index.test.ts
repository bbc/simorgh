import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import { Agent } from 'undici';

const mockAgent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
} as unknown as Agent;

jest.mock('#utilities/getAgent', () => ({
  __esModule: true,
  default: async () => mockAgent,
}));

const mockNavResponse = {
  data: {
    items: [
      { title: 'Home', url: '/home' },
      { title: 'About', url: '/about' },
    ],
  },
};

const originalSimorghAppEnv = process.env.SIMORGH_APP_ENV;

describe('fetchConfig', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.SIMORGH_APP_ENV = 'local';
    process.env.BFF_PATH = 'https://mock-bff-path';
  });

  afterAll(() => {
    process.env.SIMORGH_APP_ENV = originalSimorghAppEnv;
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch configuration data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNavResponse,
    });

    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    });

    expect(data).toEqual(mockNavResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should fetch configuration data with variant when variant is provided', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNavResponse,
    });

    const { default: fetchConfig } = await import('.');

    const variant = 'lat';
    const data = await fetchConfig({
      service: 'serbian',
      pagePath: '/serbian',
      configType: 'navigation',
      variant,
    });

    expect(data).toEqual(mockNavResponse);
    const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
    expect(fetchUrl).toContain(`variant=${variant}`);
  });

  it('should return cached data on subsequent calls', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNavResponse,
    });

    const { default: fetchConfig } = await import('.');

    await fetchConfig({
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    });
    await fetchConfig({
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    });

    // Should call fetch only once with subsequent responses from cache
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should share concurrent misses until the response body is parsed', async () => {
    const { promise, resolve } =
      Promise.withResolvers<typeof mockNavResponse>();
    const { promise: bodyStarted, resolve: startBody } =
      Promise.withResolvers<void>();
    const json = jest.fn(() => {
      startBody();
      return promise;
    });
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json });
    const { default: fetchConfig } = await import('.');
    const params = {
      service: 'indonesia',
      pagePath: '/indonesia?renderer_env=test',
      configType: 'navigation',
    } as const;

    const firstRequest = fetchConfig(params);
    await bodyStarted;
    const secondRequest = fetchConfig(params);

    resolve(mockNavResponse);

    await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([
      mockNavResponse,
      mockNavResponse,
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);

    await expect(fetchConfig(params)).resolves.toEqual(mockNavResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should deduplicate a new fetch after the cached configuration expires', async () => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(1);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNavResponse,
    });
    const { default: fetchConfig } = await import('.');
    const params = {
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    } as const;
    await fetchConfig(params);

    jest.advanceTimersByTime(300001);

    await expect(
      Promise.all([fetchConfig(params), fetchConfig(params)]),
    ).resolves.toEqual([mockNavResponse, mockNavResponse]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['service', { service: 'mundo' }],
    ['variant', { variant: 'lat' }],
    ['environment', { pagePath: '/serbian?renderer_env=live' }],
  ] as const)(
    'should keep concurrent requests and cached responses separate by %s',
    async (_name, overrides) => {
      const otherResponse = { data: { items: [] } };
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => mockNavResponse,
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => otherResponse,
        });
      const { default: fetchConfig } = await import('.');
      const params = {
        service: 'serbian',
        variant: 'cyr',
        pagePath: '/serbian?renderer_env=test',
        configType: 'navigation',
      } as const;
      const otherParams = { ...params, ...overrides };

      await expect(
        Promise.all([fetchConfig(params), fetchConfig(otherParams)]),
      ).resolves.toEqual([mockNavResponse, otherResponse]);
      await expect(fetchConfig(params)).resolves.toEqual(mockNavResponse);
      await expect(fetchConfig(otherParams)).resolves.toEqual(otherResponse);
      expect(global.fetch).toHaveBeenCalledTimes(2);
    },
  );

  it.each([
    ['network error', () => Promise.reject(new Error('Network error'))],
    ['HTTP error', async () => ({ ok: false, status: 500 })],
    [
      'JSON error',
      async () => ({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      }),
    ],
  ])('should share a %s and allow a later retry', async (_name, failure) => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(failure)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockNavResponse,
      });
    const { default: fetchConfig } = await import('.');
    const params = {
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    } as const;

    const results = await Promise.allSettled([
      fetchConfig(params),
      fetchConfig(params),
    ]);

    expect(results).toEqual([
      { status: 'rejected', reason: expect.any(Error) },
      { status: 'rejected', reason: expect.any(Error) },
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await expect(fetchConfig(params)).resolves.toEqual(mockNavResponse);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it.each(['test', 'live'])(
    'should include ctx-service-env header when renderer_env=%s',
    async env => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockNavResponse,
      });

      const { default: fetchConfig } = await import('.');

      await fetchConfig({
        service: 'indonesia',
        pagePath: `/indonesia?renderer_env=${env}`,
        configType: 'navigation',
      });

      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: { 'ctx-service-env': env },
        signal: expect.any(AbortSignal),
        agent: mockAgent,
      });
    },
  );

  it.each(['test', 'live'])(
    'should include ctx-service-env header when actual environment is %s without renderer_env param',
    async env => {
      process.env.SIMORGH_APP_ENV = env;

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockNavResponse,
      });

      const { default: fetchConfig } = await import('.');

      await fetchConfig({
        service: 'indonesia',
        pagePath: `/indonesia`,
        configType: 'navigation',
      });

      expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
        headers: { 'ctx-service-env': env },
        signal: expect.any(AbortSignal),
        agent: mockAgent,
      });
    },
  );

  it('should not include ctx-service-env header when in local environment', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockNavResponse,
    });

    const { default: fetchConfig } = await import('.');

    await fetchConfig({
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    });

    expect(global.fetch).toHaveBeenCalledWith(expect.any(String), {
      signal: expect.any(AbortSignal),
    });
  });

  it('should log an error if the fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { default: fetchConfig } = await import('.');

    await expect(
      fetchConfig({
        service: 'indonesia',
        pagePath: '/indonesia',
        configType: 'navigation',
      }),
    ).rejects.toThrow('Failed to fetch config for service: indonesia');
  });

  // TODO: Remove suite once new nav is rolled out to all services on Live
  describe('useNewNav param', () => {
    afterAll(() => {
      process.env.SIMORGH_APP_ENV = originalSimorghAppEnv;
    });

    it.each(SERVICES_WITH_NEW_NAV)(
      'should set the useNewNav param for %s service',
      async service => {
        global.fetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => mockNavResponse,
        });

        const { default: fetchConfig } = await import('.');

        await fetchConfig({
          service,
          pagePath: `/${service}`,
          configType: 'navigation',
        });

        const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
        expect(fetchUrl).toContain('useNewNav=true');
      },
    );

    it('should set both variant and useNewNav params for a dual-script service', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => mockNavResponse,
      });

      const { default: fetchConfig } = await import('.');

      await fetchConfig({
        service: 'serbian',
        variant: 'cyr',
        pagePath: '/serbian',
        configType: 'navigation',
      });

      const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0];
      expect(fetchUrl).toContain('variant=cyr');
      expect(fetchUrl).toContain('useNewNav=true');
    });
  });
});
