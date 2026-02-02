import { Agent } from 'undici';

const mockAgent = {
  connect: { cert: 'cert', ca: 'ca', key: 'key' },
} as unknown as Agent;

jest.mock('#src/server/utilities/getAgent', () => ({
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

describe('fetchConfig', () => {
  beforeEach(() => {
    jest.resetModules();

    process.env.SIMORGH_APP_ENV = 'local';
    process.env.BFF_PATH = 'https://mock-bff-path';
  });

  it('should return null for unsupported services', async () => {
    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'news',
      pagePath: '/news',
      configType: 'navigation',
    });

    expect(data).toBeNull();
  });

  it('should return null when in live environment', async () => {
    process.env.SIMORGH_APP_ENV = 'live';

    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'indonesia',
      pagePath: '/indonesia',
      configType: 'navigation',
    });

    expect(data).toBeNull();
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

  // TODO: Add 'live' environment test once rolling out to Live environment
  it.each(['test'])(
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

  // TODO: Add 'live' environment test once rolling out to Live environment
  it.each(['test'])(
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
});
