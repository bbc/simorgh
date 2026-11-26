import { PropsWithChildren } from 'react';
import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Variants } from '#app/models/types/global';
import useNearViewport from '#app/hooks/useNearViewport';
import useFetchReadTimeRecommendations from '.';

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

describe('useFetchReadTimeRecommendations', () => {
  const topicIdA = 'c2lemz0vkm8t';
  const topicIdB = 'cg7267qwzx1t';
  const topicIdC = 'cxyz1234abcd';

  const readTimeItemsA = [
    {
      type: 'article',
      title: 'Article One',
      link: 'https://www.bbc.com/article-one',
      description: 'Description for article one',
      imageUrl: 'https://www.bbc.com/image-one.jpg',
      imageAlt: 'Image alt text one',
    },
    {
      type: 'article',
      title: 'Article Two',
      link: 'https://www.bbc.com/article-two',
      description: 'Description for article two',
      imageUrl: 'https://www.bbc.com/image-two.jpg',
      imageAlt: 'Image alt text two',
    },
  ];

  const readTimeItemsB = [
    {
      type: 'article',
      title: 'Article Three',
      link: 'https://www.bbc.com/article-three',
      description: 'Description for article three',
      imageUrl: 'https://www.bbc.com/image-three.jpg',
      imageAlt: 'Image alt text three',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNearViewport.mockReturnValue(false);

    global.fetch = mockFetch;
  });

  it('does not fetch recommendations before the component is near viewport', () => {
    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.items).toEqual([]);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
  });

  it('fetches recommendations when near viewport with correct search params', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: readTimeItemsA } }),
    });

    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = new URL(fetchUrl as string);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(requestUrl.searchParams.get('onwardJourney')).toBe(
      'readTimeRecommendations',
    );
    expect(requestUrl.searchParams.get('service')).toBe('pidgin');
    expect(requestUrl.searchParams.get('id')).toBe(topicIdA);
    expect(requestUrl.searchParams.has('variant')).toBe(false);
    expect(result.current.items).toEqual(readTimeItemsA);
    expect(result.current.isError).toBe(false);
  });

  it('sends multiple topicIds comma-joined in one request', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: readTimeItemsA } }),
    });

    const { result } = renderHook(
      () =>
        useFetchReadTimeRecommendations({
          topicIds: [topicIdA, topicIdB, topicIdC],
        }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = new URL(fetchUrl as string);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(requestUrl.searchParams.get('id')).toBe(
      `${topicIdA},${topicIdB},${topicIdC}`,
    );
  });

  it('includes variant query parameter when variant exists in RequestContext', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: readTimeItemsA } }),
    });

    renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      {
        wrapper: createWrapper('cyr'),
      },
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = new URL(fetchUrl as string);

    expect(requestUrl.searchParams.get('variant')).toBe('cyr');
  });

  it('returns items and isLoading false on successful fetch', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: readTimeItemsA } }),
    });

    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toEqual(readTimeItemsA);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
  });

  it('sets isError to true and items to empty array on non-200 response', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 500,
    });

    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toEqual([]);
    expect(result.current.isError).toBe(true);
  });

  it('sets isError to true and items to empty array when fetch is rejected', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockRejectedValue(new Error('fetch failed'));

    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toEqual([]);
    expect(result.current.isError).toBe(true);
  });

  it('sets items to empty array when response body has malformed data', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: 'not an array' } }),
    });

    const { result } = renderHook(
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
      { wrapper: createWrapper() },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.items).toEqual([]);
  });

  it('does not refetch when rerendering with the same topicIds', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: { items: readTimeItemsA } }),
    });

    const { result, rerender } = renderHook(
      ({ topicIds }) => useFetchReadTimeRecommendations({ topicIds }),
      {
        initialProps: { topicIds: [topicIdA] },
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetch).toHaveBeenCalledTimes(1);

    rerender({ topicIds: [topicIdA] });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('refetches when topicIds change', async () => {
    mockUseNearViewport.mockReturnValue(true);

    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: { items: readTimeItemsA } }),
      })
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: { items: readTimeItemsB } }),
      });

    const { result, rerender } = renderHook(
      ({ topicIds }) => useFetchReadTimeRecommendations({ topicIds }),
      {
        initialProps: { topicIds: [topicIdA] },
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.items).toEqual(readTimeItemsA));

    expect(mockFetch).toHaveBeenCalledTimes(1);

    rerender({ topicIds: [topicIdB] });

    await waitFor(() => expect(result.current.items).toEqual(readTimeItemsB));

    expect(mockFetch).toHaveBeenCalledTimes(2);
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
      () => useFetchReadTimeRecommendations({ topicIds: [topicIdA] }),
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
