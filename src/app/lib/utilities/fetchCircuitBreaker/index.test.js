import { createFetchCircuitBreaker } from '.';

const successFetchResponse = JSON.stringify({ data: 'something' });

let fetchCircuitBreaker;

describe('fetchCircuitBreaker', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetchCircuitBreaker = createFetchCircuitBreaker();
  });

  it('should make request when circuit is closed', async () => {
    fetch.mockResponse(successFetchResponse);
    const response = await fetchCircuitBreaker('https://success.com');
    const json = await response.json();
    expect(json.data).toEqual('something');
    expect(fetch).toHaveBeenCalled();
  });

  it('should have circuit breakers for various hosts', async () => {
    const successHost = 'https://success.com';
    const failureHost = 'https://failure.com';
    fetch.mockReject(Error('timeout'));
    await expect(fetchCircuitBreaker(failureHost)).rejects.toThrow('timeout');
    await expect(fetchCircuitBreaker(failureHost)).rejects.toThrow(
      'Breaker is open',
    );
    await expect(fetchCircuitBreaker(`${failureHost}/path`)).rejects.toThrow(
      'Breaker is open',
    );

    fetch.mockResponse(successFetchResponse);
    await expect(fetchCircuitBreaker(failureHost)).rejects.toThrow(
      'Breaker is open',
    );
    await expect(fetchCircuitBreaker(successHost)).resolves.toBeDefined();
    const response = await fetchCircuitBreaker(successHost);
    const json = await response.json();
    expect(json.data).toEqual('something');
  });

  it('should check if host is available after timeout', async () => {
    jest.setTimeout(11000);
    const host = 'https://example.com';
    fetch.mockReject(Error('timeout'));
    await expect(fetchCircuitBreaker(host)).rejects.toThrow('timeout');
    await expect(fetchCircuitBreaker(host)).rejects.toThrow('Breaker is open');
    await new Promise(resolve => setTimeout(resolve, 10000));
    fetch.mockResponse(successFetchResponse);
    await expect(fetchCircuitBreaker(host)).resolves.toBeDefined();
  });
});
