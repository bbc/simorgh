import { PropsWithChildren } from 'react';
import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { Variants } from '#app/models/types/global';
import useFetchTopicPromos from '.';

jest.mock('#app/lib/utilities/getEnvConfig', () => ({
  getEnvConfig: jest.fn(() => ({
    WEB_CDN_URL: 'https://www.test.bbc.com',
  })),
}));

const mockFetch = jest.fn();

const createWrapper = ({
  variant,
  children,
}: PropsWithChildren<{
  variant?: Variants;
}>) => (
  <RequestContextProvider
    service="pidgin"
    variant={variant}
    pageType="article"
    pathname=""
  >
    {children}
  </RequestContextProvider>
);

describe('useFetchTopicPromos', () => {
  const topicIdA = 'topic-a';
  const topicIdB = 'topic-b';

  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = mockFetch;
  });

  test('does not fetch promos before the component is near viewport', () => {
    const { result } = renderHook(
      () =>
        useFetchTopicPromos({
          activeTabId: topicIdA,
          isNearViewport: false,
        }),
      { wrapper: () => createWrapper({}) },
    );

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.topicPromos).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  test('fetches promos when near viewport and builds expected request URL', async () => {
    const items = [{ headline: 'first promo' }];

    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: items }),
    });

    const { result } = renderHook(
      () =>
        useFetchTopicPromos({
          activeTabId: topicIdA,
          isNearViewport: true,
        }),
      { wrapper: () => createWrapper({}) },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = fetchUrl as URL;

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(requestUrl.toString()).toContain(
      'https://www.test.bbc.com/fd/simorgh-bff',
    );
    expect(requestUrl.searchParams.get('onwardJourney')).toBe('topicDiscovery');
    expect(requestUrl.searchParams.get('service')).toBe('news');
    expect(requestUrl.searchParams.get('id')).toBe(topicIdA);
    expect(requestUrl.searchParams.has('variant')).toBe(false);
    expect(result.current.topicPromos).toEqual(items);
  });

  test('includes variant query parameter when variant exists in request context', async () => {
    mockFetch.mockResolvedValue({
      status: 200,
      json: async () => ({ data: [] }),
    });

    renderHook(
      () =>
        useFetchTopicPromos({
          activeTabId: topicIdA,
          isNearViewport: true,
        }),
      {
        wrapper: () => createWrapper({ variant: 'cyr' }),
      },
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));

    const [fetchUrl] = mockFetch.mock.calls[0];
    const requestUrl = fetchUrl as URL;

    expect(requestUrl.searchParams.get('variant')).toBe('cyr');
  });

  test('reuses cached promos when returning to a previously fetched tab', async () => {
    const firstTabItems = [{ headline: 'first tab promo' }];
    const secondTabItems = [{ headline: 'second tab promo' }];

    mockFetch
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: firstTabItems }),
      })
      .mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: secondTabItems }),
      });

    const { result, rerender } = renderHook(
      ({ activeTabId }) =>
        useFetchTopicPromos({
          activeTabId,
          isNearViewport: true,
        }),
      {
        initialProps: { activeTabId: topicIdA },
        wrapper: () => createWrapper({}),
      },
    );

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(firstTabItems),
    );

    rerender({ activeTabId: topicIdB });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(secondTabItems),
    );

    rerender({ activeTabId: topicIdA });

    await waitFor(() =>
      expect(result.current.topicPromos).toEqual(firstTabItems),
    );

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});
