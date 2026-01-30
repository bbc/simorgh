jest.mock('../getIdctaBaseUrl');

describe('fetchIdctaConfig', () => {
  const mockIdctaConfigUrl = 'https://idcta.test.api.bbc.com/idcta/config';
  const mockIdctaConfig = {
    idctaBaseUrl: 'https://idcta.test.api.bbc.com/idcta',
    signInUrl: '/signin',
    registerUrl: '/register',
    'id-availability': true,
  };

  afterEach(() => {
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
