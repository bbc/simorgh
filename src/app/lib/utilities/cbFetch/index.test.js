import { createFetchWithCircuitBreaker } from '.';

let cbFetch;

describe('cbFetch', () => {
  beforeEach(() => {
    fetch.resetMocks();
    cbFetch = createFetchWithCircuitBreaker();
  });

  it('should make request when circuit is open', async () => {
    fetch.mockResponseOnce(JSON.stringify({ data: 'something' }));
    const response = await cbFetch('example.com');
    const json = await response.json();
    expect(json.data).toEqual('something');
    expect(fetch).toHaveBeenCalled();
  });

  it('should close circuit after failed requests exceed threshold', async () => {
    fetch.mockReject(Error('timeout'));
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow(
      'Client side rate limiting applied.',
    );
  });

  it('should reopen circuit after timeout time', async () => {
    fetch.mockReject(Error('timeout'));
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow('timeout');
    await expect(cbFetch('example.com')).rejects.toThrow(
      'Client side rate limiting applied.',
    );

    fetch.mockResponseOnce(JSON.stringify({ data: 'something' }));
    await new Promise(resolve => setTimeout(resolve, 600));
    const response = await cbFetch('example.com');
    const json = await response.json();
    expect(json.data).toEqual('something');
    expect(fetch).toHaveBeenCalled();
  });
});
