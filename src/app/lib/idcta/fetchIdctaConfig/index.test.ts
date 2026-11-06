jest.mock('../getIdctaBaseUrl');

describe('fetchIdctaConfig', () => {
  const mockIdctaConfigUrl = 'https://idcta.test.api.bbc.com/idcta/config';
  const mockIdctaConfig = {
    idctaBaseUrl: 'https://idcta.test.api.bbc.com/idcta',
    signInUrl: '/signin',
    registerUrl: '/register',
    'id-availability': 'GREEN',
  };

  afterEach(() => {
    jest.useRealTimers();
    jest.resetModules();
    jest.clearAllMocks();
  });

  const setupMocks = async () => {
    const { getIdctaConfigUrl } = await import('../getIdctaBaseUrl');
    (getIdctaConfigUrl as jest.Mock).mockReturnValue(mockIdctaConfigUrl);
    const { default: fetchIdctaConfig } = await import('.');
    return fetchIdctaConfig;
  };

  it('should fetch config successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });

    const fetchIdctaConfig = await setupMocks();
    const result = await fetchIdctaConfig();

    expect(result).toEqual(mockIdctaConfig);
    expect(global.fetch).toHaveBeenCalledWith(mockIdctaConfigUrl);
  });

  it('should return cached data on subsequent calls', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });

    const fetchIdctaConfig = await setupMocks();

    const result1 = await fetchIdctaConfig();
    const result2 = await fetchIdctaConfig();

    expect(result1).toEqual(mockIdctaConfig);
    expect(result2).toEqual(mockIdctaConfig);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return null when fetch throws an error', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    const fetchIdctaConfig = await setupMocks();

    const result = await fetchIdctaConfig();

    expect(result).toBeNull();
  });

  it('should share concurrent misses until the response body is parsed', async () => {
    const { promise, resolve } =
      Promise.withResolvers<typeof mockIdctaConfig>();
    const { promise: bodyStarted, resolve: startBody } =
      Promise.withResolvers<void>();
    const json = jest.fn(() => {
      startBody();
      return promise;
    });
    (global.fetch as jest.Mock).mockResolvedValue({ ok: true, json });
    const fetchIdctaConfig = await setupMocks();

    const firstRequest = fetchIdctaConfig();
    await bodyStarted;
    const secondRequest = fetchIdctaConfig();

    resolve(mockIdctaConfig);

    await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([
      mockIdctaConfig,
      mockIdctaConfig,
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(json).toHaveBeenCalledTimes(1);

    await expect(fetchIdctaConfig()).resolves.toEqual(mockIdctaConfig);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should deduplicate a new fetch after the cached configuration expires', async () => {
    jest.useFakeTimers();
    jest.advanceTimersByTime(1);
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockIdctaConfig,
    });
    const fetchIdctaConfig = await setupMocks();
    await fetchIdctaConfig();

    jest.advanceTimersByTime(30001);

    await expect(
      Promise.all([fetchIdctaConfig(), fetchIdctaConfig()]),
    ).resolves.toEqual([mockIdctaConfig, mockIdctaConfig]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should not share requests for different config URLs', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockIdctaConfig,
    });
    const fetchIdctaConfig = await setupMocks();
    const { getIdctaConfigUrl } = await import('../getIdctaBaseUrl');

    const testRequest = fetchIdctaConfig();
    (getIdctaConfigUrl as jest.Mock).mockReturnValue(
      'https://idcta.api.bbc.com/idcta/config',
    );
    const liveRequest = fetchIdctaConfig();

    await expect(Promise.all([testRequest, liveRequest])).resolves.toEqual([
      mockIdctaConfig,
      mockIdctaConfig,
    ]);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it.each([
    ['network error', () => Promise.reject(new Error('Network error'))],
    [
      'HTTP error',
      async () => ({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      }),
    ],
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
    (global.fetch as jest.Mock)
      .mockImplementationOnce(failure)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockIdctaConfig,
      });
    const fetchIdctaConfig = await setupMocks();

    await expect(
      Promise.all([fetchIdctaConfig(), fetchIdctaConfig()]),
    ).resolves.toEqual([null, null]);
    expect(global.fetch).toHaveBeenCalledTimes(1);

    await expect(fetchIdctaConfig()).resolves.toEqual(mockIdctaConfig);
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('should not cache failed responses', async () => {
    const fetchIdctaConfig = await setupMocks();

    // First call fails
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error'),
    );
    const result1 = await fetchIdctaConfig();
    expect(result1).toBeNull();

    // Second call succeeds - should fetch again, not return cached null
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockIdctaConfig),
    });
    const result2 = await fetchIdctaConfig();
    expect(result2).toEqual(mockIdctaConfig);

    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});
