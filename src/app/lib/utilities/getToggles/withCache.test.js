import fetchMock from 'fetch-mock';
import Cache from 'lru-cache';
import withCache from './withCache';
import getToggles from '.';

jest.mock('lru-cache');
jest.mock('.');

describe('withCache', () => {
  it('creates a cache, and returns a function that calls getToggles with this cache', () => {
    const mockMundoUrl =
      'https://mock-config-endpoint?application=simorgh&service=mundo&__amp_source_origin=http://localhost';
    const mockMundoResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };
    fetchMock.mock(mockMundoUrl, mockMundoResponse);

    const mockPidginUrl =
      'https://mock-config-endpoint?application=simorgh&service=pidgin&__amp_source_origin=http://localhost';
    const mockPidginResponse = {
      toggles: {
        testToggle: { enabled: true },
      },
    };
    fetchMock.mock(mockPidginUrl, mockPidginResponse);

    withCache('mundo');
    withCache('pidgin');

    // ensure we only have once instance of the cache
    expect(Cache).toHaveBeenCalledTimes(1);

    // ensure the same cache is used for multiple calls
    const mockCacheInstance = Cache.mock.instances[0];
    expect(getToggles).toHaveBeenNthCalledWith(1, 'mundo', mockCacheInstance);
    expect(getToggles).toHaveBeenNthCalledWith(2, 'pidgin', mockCacheInstance);
  });
});
