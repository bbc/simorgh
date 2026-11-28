import deduplicateRequests from '.';

describe('deduplicateRequests', () => {
  it('shares the pending request for the same key', async () => {
    const deduplicateRequest = deduplicateRequests<string>();
    const { promise, resolve } = Promise.withResolvers<string>();
    const request = jest.fn(() => promise);

    const firstRequest = deduplicateRequest('config', request);
    const secondRequest = deduplicateRequest('config', request);

    expect(secondRequest).toBe(firstRequest);
    expect(request).toHaveBeenCalledTimes(1);

    resolve('config value');

    await expect(firstRequest).resolves.toBe('config value');
    await expect(secondRequest).resolves.toBe('config value');
  });

  it('does not share requests for different keys', async () => {
    const deduplicateRequest = deduplicateRequests<string>();
    const request = jest.fn(async () => 'config value');

    await expect(
      Promise.all([
        deduplicateRequest('first', request),
        deduplicateRequest('second', request),
      ]),
    ).resolves.toEqual(['config value', 'config value']);
    expect(request).toHaveBeenCalledTimes(2);
  });

  it('removes completed requests rather than caching their results', async () => {
    const deduplicateRequest = deduplicateRequests<string>();
    const request = jest.fn(async () => 'config value');

    await deduplicateRequest('config', request);
    await deduplicateRequest('config', request);

    expect(request).toHaveBeenCalledTimes(2);
  });

  it('shares failures and allows a later retry', async () => {
    const deduplicateRequest = deduplicateRequests<string>();
    const error = new Error('Request failed');
    const request = jest
      .fn()
      .mockRejectedValueOnce(error)
      .mockResolvedValueOnce('config value');

    const results = await Promise.allSettled([
      deduplicateRequest('config', request),
      deduplicateRequest('config', request),
    ]);

    expect(results).toEqual([
      { status: 'rejected', reason: error },
      { status: 'rejected', reason: error },
    ]);
    expect(request).toHaveBeenCalledTimes(1);

    await expect(deduplicateRequest('config', request)).resolves.toBe(
      'config value',
    );
    expect(request).toHaveBeenCalledTimes(2);
  });
});
