import { LRUCache } from 'lru-cache';
import withCache from './withCache';
import getToggles from '.';

jest.mock('lru-cache');
jest.mock('.');

describe('withCache', () => {
  afterEach(() => {
    getToggles.mockReset();
  });

  it('creates a single cache and calls getToggles with it for the simorgh application', async () => {
    getToggles.mockResolvedValue({ testToggle: { enabled: true } });

    await withCache({ service: 'mundo' });
    await withCache({ service: 'pidgin' });

    // ensure we only have once instance of the cache
    expect(LRUCache).toHaveBeenCalledTimes(1);

    // ensure the same cache is used for multiple calls
    const mockCacheInstance = LRUCache.mock.instances[0];
    expect(getToggles).toHaveBeenNthCalledWith(1, {
      service: 'mundo',
      cache: mockCacheInstance,
    });
    expect(getToggles).toHaveBeenNthCalledWith(2, {
      service: 'pidgin',
      cache: mockCacheInstance,
    });
  });

  it('does not fetch amp toggles when isAmp is false', async () => {
    getToggles.mockResolvedValue({ testToggle: { enabled: true } });

    await withCache({ service: 'mundo', isAmp: false });

    expect(getToggles).toHaveBeenCalledTimes(1);
    expect(getToggles).not.toHaveBeenCalledWith(
      expect.objectContaining({ isAmp: true }),
    );
  });

  it('fetches both simorgh and amp toggles and merges them when isAmp is true', async () => {
    const simorghToggles = {
      sharedToggle: { enabled: false },
      simorghOnlyToggle: { enabled: true },
    };
    const ampToggles = {
      sharedToggle: { enabled: true },
      ampOnlyToggle: { enabled: true },
    };

    getToggles
      .mockResolvedValueOnce(simorghToggles)
      .mockResolvedValueOnce(ampToggles);

    const toggles = await withCache({ service: 'mundo', isAmp: true });

    const mockCacheInstance = LRUCache.mock.instances[0];
    expect(getToggles).toHaveBeenNthCalledWith(1, {
      service: 'mundo',
      cache: mockCacheInstance,
    });
    expect(getToggles).toHaveBeenNthCalledWith(2, {
      service: 'mundo',
      cache: mockCacheInstance,
      isAmp: true,
    });

    // amp toggles take precedence over simorgh toggles on conflicts
    expect(toggles).toEqual({
      sharedToggle: { enabled: true },
      simorghOnlyToggle: { enabled: true },
      ampOnlyToggle: { enabled: true },
    });
  });
});
