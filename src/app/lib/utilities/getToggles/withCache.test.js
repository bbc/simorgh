import { LRUCache } from 'lru-cache';
import withCache from './withCache';
import getToggles from '.';

jest.mock('lru-cache');
jest.mock('.');

describe('withCache', () => {
  it('creates a cache, and returns a function that calls getToggles with this cache', () => {
    const mockMundoResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };
    fetch.mockResponseOnce(JSON.stringify(mockMundoResponse));

    const mockPidginResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };
    fetch.mockResponseOnce(JSON.stringify(mockPidginResponse));

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
