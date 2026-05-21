import fixtureSportDataUpdate from '../fixture/fixtureSportDataUpdate';
import makeRequest from '.';

describe('makeRequest', () => {
  it('should return data on a valid 200 response where data exists', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () =>
            Promise.resolve({
              data: { sportDataEvent: fixtureSportDataUpdate },
            }),
        }),
      ) as jest.Mock,
    );

    const result = await makeRequest('urn:bbc:sportsdata:football:event:123');
    expect(result).toStrictEqual(fixtureSportDataUpdate);
  });

  it('should return null on non-200 responses', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 301,
      json: async () => ({ data: { sportDataEvent: fixtureSportDataUpdate } }),
    } as Response);

    const result = await makeRequest('urn:bbc:sportsdata:football:event:123');
    expect(result).toBeNull();
  });

  it('should return null when fetch throws', async () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network error'));

    const result = await makeRequest('urn:bbc:sportsdata:football:event:123');
    expect(result).toBeNull();
  });

  it('should return null when response data is missing', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      status: 200,
      json: async () => ({ data: {} }),
    } as Response);

    const result = await makeRequest('urn:bbc:sportsdata:football:event:123');
    expect(result).toBeNull();
  });
});
