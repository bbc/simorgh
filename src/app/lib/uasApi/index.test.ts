import uasApiRequest from './index';

jest.mock('./getAuthHeader', () =>
  jest.fn(() => ({
    Authorization: 'Bearer mocked-token',
    'X-Authentication-Provider': 'idv5',
    'X-API-Key': 'mocked-api-key',
  })),
);

global.fetch = jest.fn();

describe('uasApiRequest', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a GET request with correct headers and URL', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    const activityType = 'favourites';
    const response = await uasApiRequest('GET', activityType);

    expect(global.fetch).toHaveBeenCalledWith(
      `https://activity.test.api.bbc.co.uk/my/${activityType}`,
      expect.objectContaining({
        method: 'GET',
        headers: expect.objectContaining({
          Authorization: 'Bearer mocked-token',
          'X-Authentication-Provider': 'idv5',
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
      `https://activity.test.api.bbc.co.uk/my/${activityType}`,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer mocked-token',
          'X-Authentication-Provider': 'idv5',
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
      `https://activity.test.api.bbc.co.uk/my/${activityType}/${encodeURIComponent(globalId)}`,
      expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          Authorization: 'Bearer mocked-token',
          'X-Authentication-Provider': 'idv5',
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
});
