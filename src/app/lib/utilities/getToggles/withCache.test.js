import { LRUCache } from 'lru-cache';

import getToggles from '.';
import withCache from './withCache';

jest.mock('lru-cache');
jest.mock('.');

describe('withCache', () => {
  it('creates a cache, and returns a function that calls getToggles with this cache', () => {
    const mockMundoResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockMundoResponse,
    });

    const mockPidginResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };

    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => mockPidginResponse,
    });

    withCache('mundo');
    withCache('pidgin');

    // ensure we only have once instance of the cache
    expect(LRUCache).toHaveBeenCalledTimes(1);

    // ensure the same cache is used for multiple calls
    const mockCacheInstance = LRUCache.mock.instances[0];
    expect(getToggles).toHaveBeenNthCalledWith(1, 'mundo', mockCacheInstance);
    expect(getToggles).toHaveBeenNthCalledWith(2, 'pidgin', mockCacheInstance);
  });
});
