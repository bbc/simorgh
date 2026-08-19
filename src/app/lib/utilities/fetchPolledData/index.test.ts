import * as getEnvConfigModule from '../getEnvConfig';

jest.mock('#app/lib/logger.node', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    error: jest.fn(),
    info: jest.fn(),
    debug: jest.fn(),
  })),
}));

const mockLoggerModule = require('#app/lib/logger.node');

const mockLoggerInstance = {
  error: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

describe('fetchPolledData', () => {
  const originalEnv = process.env;
  const mockData = { items: [{ id: 1, title: 'Test' }] };
  const mockResponse = { data: mockData, status: 200 };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    mockLoggerModule.default.mockReturnValue(mockLoggerInstance);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it('should successfully fetch polled data with params', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia', limit: '10' },
    });

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://mock-cdn.example.com/ws/poll-data/live?region=asia&limit=10',
    );
  });

  it('should successfully fetch polled data without optional params', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', { params: {} });

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://mock-cdn.example.com/ws/poll-data/live',
    );
  });

  it('should return null and log error when WEB_CDN_URL is missing', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({} as any);

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia' },
    });

    expect(result).toBeNull();
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      'poll_data_missing_cdn_host',
      { module: 'live' },
    );
  });

  it('should return null and log error when status is not 200', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 404,
      json: async () => mockResponse,
    });

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia' },
    });

    expect(result).toBeNull();
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      'poll_data_non_200_status',
      expect.objectContaining({
        module: 'live',
        status: 404,
      }),
    );
  });

  it('should return null and log fetch error on network error', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    const networkError = new TypeError('Failed to fetch');
    (global.fetch as jest.Mock).mockRejectedValue(networkError);

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia' },
    });

    expect(result).toBeNull();
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      'poll_data_fetch_error',
      expect.objectContaining({
        module: 'live',
        error: 'Failed to fetch',
      }),
    );
  });

  it('should return null and log parse error on invalid JSON', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => {
        throw new SyntaxError('Unexpected token < in JSON at position 0');
      },
    });

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia' },
    });

    expect(result).toBeNull();
    expect(mockLoggerInstance.error).toHaveBeenCalledWith(
      'poll_data_parse_error',
      expect.objectContaining({
        module: 'live',
        error: expect.stringContaining('Unexpected token'),
      }),
    );
  });

  it('should handle numeric and boolean params correctly', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      json: async () => mockResponse,
    });

    const { default: fetchPolledData } = await import('.');

    await fetchPolledData('live', {
      params: { limit: 5, page: 2, debug: true },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://mock-cdn.example.com/ws/poll-data/live?limit=5&page=2&debug=true',
    );
  });

  it('should handle unknown error types', async () => {
    jest.spyOn(getEnvConfigModule, 'getEnvConfig').mockReturnValue({
      WEB_CDN_URL: 'https://mock-cdn.example.com',
    } as any);

    (global.fetch as jest.Mock).mockRejectedValue('unknown error');

    const { default: fetchPolledData } = await import('.');

    const result = await fetchPolledData('live', {
      params: { region: 'asia' },
    });

    expect(result).toBeNull();
    expect(mockLoggerInstance.error).toHaveBeenCalled();
  });
});
