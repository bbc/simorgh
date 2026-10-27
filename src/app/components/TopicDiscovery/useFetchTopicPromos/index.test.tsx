import { PropsWithChildren } from 'react';
import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Variants } from '#app/models/types/global';
import useNearViewport from '#app/hooks/useNearViewport';
import { multipleTopicsFixture } from '../fixtures';
import useFetchTopicPromos from '.';

jest.mock('#app/lib/utilities/getEnvConfig', () => ({
  getEnvConfig: jest.fn(() => ({
    WEB_CDN_URL: 'https://www.test.bbc.com',
  })),
}));

jest.mock('#app/hooks/useNearViewport');

const mockFetch = jest.fn();

const mockUseNearViewport = useNearViewport as jest.MockedFunction<
  typeof useNearViewport
>;

const createWrapper = (variant?: Variants) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <ServiceContextProvider service="pidgin" variant={variant}>
      <RequestContextProvider
        service="pidgin"
        variant={variant}
        pageType="article"
        pathname=""
      >
        {children}
      </RequestContextProvider>
    </ServiceContextProvider>
  );

  return Wrapper;
};

describe('useFetchTopicPromos', () => {
  const topicIdA = 'c2lemz0vkm8t';
  const topicIdB = 'cg7267qwzx1t';
  const topicItemsA = multipleTopicsFixture[topicIdA].data.items;
  const topicItemsB = multipleTopicsFixture[topicIdB].data.items;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNearViewport.mockReturnValue(false);

    global.fetch = mockFetch;
  });

  it('does not fetch promos before the component is near viewport', () => {
    const { result } = renderHook(
      () => useFetchTopicPromos({ activeTabId: topicIdA }),
      { wrapper: createWrapper() },
    );

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.topicPromos).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('fetches promos when near viewport and builds expected request URL', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: topicItemsA } }),
    });

    const { result } = renderHook(
      () => useFetchTopicPromos({ activeTabId: topicIdA }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = new URL(fetchUrl as string);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(requestUrl.toString()).toContain(
      'https://www.test.bbc.com/fd/simorgh-bff',
    );
    expect(requestUrl.searchParams.get('onwardJourney')).toBe('topicDiscovery');
    expect(requestUrl.searchParams.get('service')).toBe('pidgin');
    expect(requestUrl.searchParams.get('id')).toBe(topicIdA);
    expect(requestUrl.searchParams.has('variant')).toBe(false);
    expect(result.current.topicPromos).toEqual(topicItemsA);
    expect(result.current.isError).toBe(false);
  });

  it('includes variant query parameter when variant exists in RequestContext', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: topicItemsA } }),
    });

    renderHook(() => useFetchTopicPromos({ activeTabId: topicIdA }), {
      wrapper: createWrapper('cyr'),
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = new URL(fetchUrl as string);

    expect(requestUrl.searchParams.get('variant')).toBe('cyr');
  });

  it('reuses cached promos when returning to a previously fetched tab', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: { items: topicItemsA } }),
      })
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: { items: topicItemsB } }),
      });

    const { result, rerender } = renderHook(
      ({ activeTabId }) => useFetchTopicPromos({ activeTabId }),
      {
        initialProps: { activeTabId: topicIdA },
        wrapper: createWrapper(),
      },
    );

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(topicItemsA),
    );

    rerender({ activeTabId: topicIdB });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(topicItemsB),
    );

    rerender({ activeTabId: topicIdA });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(topicItemsA),
    );

    rerender({ activeTabId: topicIdB });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(topicItemsB),
    );

    rerender({ activeTabId: topicIdA });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(topicItemsA),
    );

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should set topicPromos to an empty array and isLoading to false when fetch response is not ok', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 500,
    });

    const { result } = renderHook(
      () => useFetchTopicPromos({ activeTabId: topicIdA }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.topicPromos).toEqual([]);
    expect(result.current.isError).toBe(true);
  });

  it('should set an error message when fetch throws', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockRejectedValue(new Error('fetch failed'));

    const { result } = renderHook(
      () => useFetchTopicPromos({ activeTabId: topicIdA }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.topicPromos).toEqual([]);
    expect(result.current.isError).toBe(true);
  });

  it('should abort fetch request when component unmounts', async () => {
    mockUseNearViewport.mockReturnValue(true);

    const abortController = new AbortController();

    mockFetch.mockImplementation(
      () =>
        new Promise((_resolve, reject) => {
          abortController.signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }),
    );

    const { unmount } = renderHook(
      () => useFetchTopicPromos({ activeTabId: topicIdA }),
      { wrapper: createWrapper() },
    );

    unmount();

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
  });
});
