import Cookie from 'js-cookie';
import { getEnvConfig } from '../utilities/getEnvConfig';
import ensureTokens from './tokenRefresh/tokenManager';
import uasApiRequest from './index';

jest.mock('js-cookie');
jest.mock('../utilities/getEnvConfig');
jest.mock('./tokenRefresh/tokenManager');

global.fetch = jest.fn();

const mockCookie = Cookie as jest.Mocked<typeof Cookie>;
const mockGetEnvConfig = getEnvConfig as jest.MockedFunction<
  typeof getEnvConfig
>;

describe('uasApiRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock setup: both cookie and API key are present
    (mockCookie.get as jest.Mock).mockReturnValue('mocked-token');
    mockGetEnvConfig.mockReturnValue({
      SIMORGH_UAS_PUBLIC_API_KEY: 'mocked-api-key',
    } as ReturnType<typeof getEnvConfig>);
    // Mock ensureTokens to resolve successfully by default
    (ensureTokens as jest.Mock).mockResolvedValue(undefined);
  });

  it('should make a GET request with correct headers and URL', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const activityType = 'favourites';
    const response = await uasApiRequest('GET', activityType);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://activity.test.api.bbc.com/my/${activityType}`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          'X-API-Key': 'mocked-api-key',
        }),
      }),
    );

    const data = await response.json();
    expect(data).toEqual({ success: true });
  });

  it('should make a POST request with correct body and headers', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const activityType = 'favourites';
    const body = { activityType: 'test', metaData: { key: 'value' } };

    const response = await uasApiRequest('POST', activityType, { body });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://activity.test.api.bbc.com/my/${activityType}`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'X-API-Key': 'mocked-api-key',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify(body),
      }),
    );

    const data = await response.json();
    expect(data).toEqual({ success: true });
  });

  it('should make a DELETE request with correct URL and headers', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
    });

    const activityType = 'favourites';
    const globalId = '12345';

    await uasApiRequest('DELETE', activityType, { globalId });

    expect(global.fetch).toHaveBeenCalledWith(
      `https://activity.test.api.bbc.com/my/${activityType}/${encodeURIComponent(globalId)}`,
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          'X-API-Key': 'mocked-api-key',
        }),
      }),
    );
  });

  it('should throw an error for invalid activity type', async () => {
    const invalidActivityType = 'invalidType';

    await expect(uasApiRequest('GET', invalidActivityType)).rejects.toThrow(
      'Invalid activity type',
    );
  });

  it('should throw an error for failed requests', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const activityType = 'favourites';

    await expect(uasApiRequest('GET', activityType)).rejects.toThrow(
      'UAS request failed with status 500',
    );
  });

  it('should throw an error when API key is missing', async () => {
    // Mock the scenario where the API key is not configured
    (mockCookie.get as jest.Mock).mockReturnValue('mocked-token');
    mockGetEnvConfig.mockReturnValue({
      SIMORGH_UAS_PUBLIC_API_KEY: undefined,
    } as unknown as ReturnType<typeof getEnvConfig>);

    const activityType = 'favourites';

    await expect(uasApiRequest('GET', activityType)).rejects.toThrow(
      'Missing UAS public API key',
    );

    // Verify that fetch was never called since authentication failed
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should throw an error when ensureTokens fails', async () => {
    (ensureTokens as jest.Mock).mockRejectedValue(
      new Error('Token refresh failed'),
    );

    const activityType = 'favourites';

    await expect(uasApiRequest('GET', activityType)).rejects.toThrow(
      'Error while ensuring tokens: Token refresh failed',
    );

    // Verify that fetch was never called since token validation failed
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
