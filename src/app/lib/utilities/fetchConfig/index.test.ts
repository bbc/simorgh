describe('fetchConfig', () => {
  const mockResponse = {
    data: {
      items: [
        { title: 'Home', url: '/home' },
        { title: 'About', url: '/about' },
      ],
    },
  };

  beforeEach(() => {
    process.env.BFF_PATH = 'https://mock-bff-path';
    jest.resetModules();
  });

  it('should return null for unsupported services', async () => {
    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'news',
      configType: 'navigation',
    });

    expect(data).toBeNull();
  });

  it('should return null when in live environment', async () => {
    jest.mock('../isLive', () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue(true),
    }));

    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'indonesia',
      configType: 'navigation',
    });

    expect(data).toBeNull();
  });

  it('should fetch configuration data', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const { default: fetchConfig } = await import('.');

    const data = await fetchConfig({
      service: 'indonesia',
      configType: 'navigation',
    });

    expect(data).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return cached data on subsequent calls', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    });

    const { default: fetchConfig } = await import('.');

    await fetchConfig({ service: 'indonesia', configType: 'navigation' });
    await fetchConfig({ service: 'indonesia', configType: 'navigation' });

    // Should call fetch only once with subsequent responses from cache
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should log an error if the fetch fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { default: fetchConfig } = await import('.');

    await expect(
      fetchConfig({ service: 'indonesia', configType: 'navigation' }),
    ).rejects.toThrow('Failed to fetch config for service: indonesia');
  });
});
