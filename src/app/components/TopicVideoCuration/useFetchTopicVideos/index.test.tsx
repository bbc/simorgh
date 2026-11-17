import { PropsWithChildren } from 'react';
import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import useNearViewport from '#app/hooks/useNearViewport';
import useFetchTopicVideos from '.';

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

const Wrapper = ({ children }: PropsWithChildren) => (
  <ServiceContextProvider service="pidgin" variant="default">
    <RequestContextProvider
      service="pidgin"
      variant="default"
      pageType="article"
      pathname=""
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

const okResponse = (items: unknown[]) => ({
  status: 200,
  json: async () => ({ data: { items } }),
});

describe('useFetchTopicVideos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNearViewport.mockReturnValue(false);
    global.fetch = mockFetch;
  });

  it('does not fetch before the component is near the viewport', () => {
    const { result } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a'] }),
      {
        wrapper: Wrapper,
      },
    );

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current).toEqual({
      resultsByTopic: [],
      isLoading: true,
      isError: false,
    });
  });

  it('does not fetch when there are no topic ids', () => {
    mockUseNearViewport.mockReturnValue(true);
    renderHook(() => useFetchTopicVideos({ topicIds: [] }), {
      wrapper: Wrapper,
    });

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('makes one topicDiscovery request per topic with service and variant', async () => {
    mockUseNearViewport.mockReturnValue(true);
    mockFetch.mockResolvedValue(okResponse([{ id: 'x' }]));

    const { result } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a', 'b'] }),
      { wrapper: Wrapper },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetch).toHaveBeenCalledTimes(2);
    const urls = mockFetch.mock.calls.map(([url]) => new URL(url as string));
    expect(urls.map(url => url.searchParams.get('id'))).toEqual(['a', 'b']);
    urls.forEach(url => {
      expect(url.origin + url.pathname).toBe(
        'https://www.test.bbc.com/fd/simorgh-bff',
      );
      expect(url.searchParams.get('onwardJourney')).toBe('topicDiscovery');
      expect(url.searchParams.get('service')).toBe('pidgin');
      expect(url.searchParams.get('variant')).toBe('default');
    });
    expect(result.current.resultsByTopic).toEqual([
      [{ id: 'x' }],
      [{ id: 'x' }],
    ]);
    expect(result.current.isError).toBe(false);
  });

  it('keeps successful topics when another topic fails', async () => {
    mockUseNearViewport.mockReturnValue(true);
    mockFetch
      .mockResolvedValueOnce(okResponse([{ id: 'x' }]))
      .mockResolvedValueOnce({ status: 500, json: async () => ({}) });

    const { result } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a', 'b'] }),
      { wrapper: Wrapper },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.resultsByTopic).toEqual([[{ id: 'x' }]]);
    expect(result.current.isError).toBe(false);
  });

  it('reports an error when every topic fails', async () => {
    mockUseNearViewport.mockReturnValue(true);
    mockFetch.mockRejectedValue(new Error('network'));

    const { result } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a', 'b'] }),
      { wrapper: Wrapper },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.resultsByTopic).toEqual([]);
    expect(result.current.isError).toBe(true);
  });

  it('treats a malformed response as an empty topic', async () => {
    mockUseNearViewport.mockReturnValue(true);
    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: {} }),
    });

    const { result } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a'] }),
      {
        wrapper: Wrapper,
      },
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.resultsByTopic).toEqual([[]]);
    expect(result.current.isError).toBe(false);
  });

  it('aborts in-flight requests on unmount', async () => {
    mockUseNearViewport.mockReturnValue(true);
    let signal: AbortSignal | undefined;
    mockFetch.mockImplementation((_url, init) => {
      signal = init?.signal;
      return new Promise(() => {});
    });

    const { unmount } = renderHook(
      () => useFetchTopicVideos({ topicIds: ['a'] }),
      {
        wrapper: Wrapper,
      },
    );
    await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    unmount();

    expect(signal?.aborted).toBe(true);
  });
});
