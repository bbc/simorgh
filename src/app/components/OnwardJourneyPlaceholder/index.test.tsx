import {
  act,
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ArticleOnwardJourneysProvider } from '#app/contexts/ArticleOnwardJourneysContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import OnwardJourneyPlaceholder from '.';

const article = {
  content: { model: { blocks: [] } },
  metadata: { topics: [] },
} as unknown as Article;

let intersectionObserverCallback: IntersectionObserverCallback | undefined;
const mockFetch = jest.fn();

const createIntersectionObserverMock = () =>
  jest.fn(callback => {
    intersectionObserverCallback = callback;

    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
      unobserve: jest.fn(),
      takeRecords: jest.fn(),
    };
  });

describe('OnwardJourneyPlaceholder', () => {
  beforeEach(() => {
    intersectionObserverCallback = undefined;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { items: [] } }),
    });
    global.fetch = mockFetch;
    global.IntersectionObserver =
      createIntersectionObserverMock() as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('requests its onward journey when it is near the viewport', async () => {
    const onSkeletonReady = jest.fn();
    const { getByTestId } = render(
      <RequestContextProvider
        service="pidgin"
        pageType={ARTICLE_PAGE}
        pathname="/pidgin/articles/cvpde7nqj92o"
      >
        <ArticleOnwardJourneysProvider
          pageData={article}
          pageType={ARTICLE_PAGE}
        >
          <OnwardJourneyPlaceholder
            onwardJourney="mostRead"
            onSkeletonReady={onSkeletonReady}
          />
        </ArticleOnwardJourneysProvider>
      </RequestContextProvider>,
    );

    expect(getByTestId('onward-journey-skeleton-mostRead')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1),
    );
    expect(onSkeletonReady).toHaveBeenCalledTimes(1);

    act(() => {
      intersectionObserverCallback?.(
        [
          {
            isIntersecting: true,
            boundingClientRect: { height: 1 },
          } as IntersectionObserverEntry,
        ],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(
      new URL(mockFetch.mock.calls[0][0]).searchParams.get('onwardJourney'),
    ).toBe('mostRead');
  });

  it('observes duplicate Most Read placeholders separately and shares their pending request', async () => {
    let resolveFetch!: (response: unknown) => void;
    mockFetch.mockImplementationOnce(
      () =>
        new Promise(resolve => {
          resolveFetch = resolve;
        }),
    );
    const { getAllByTestId, queryAllByTestId } = render(
      <RequestContextProvider
        service="pidgin"
        pageType={ARTICLE_PAGE}
        pathname="/pidgin/articles/cvpde7nqj92o"
      >
        <ArticleOnwardJourneysProvider
          pageData={article}
          pageType={ARTICLE_PAGE}
        >
          <OnwardJourneyPlaceholder onwardJourney="mostRead" />
          <OnwardJourneyPlaceholder onwardJourney="mostRead" />
        </ArticleOnwardJourneysProvider>
      </RequestContextProvider>,
    );
    const placeholders = getAllByTestId('onward-journey-skeleton-mostRead');
    expect(placeholders[0].id).not.toBe(placeholders[1].id);

    await waitFor(() =>
      expect(global.IntersectionObserver).toHaveBeenCalledTimes(2),
    );
    const observerMock = jest.mocked(global.IntersectionObserver);
    expect(observerMock.mock.results[0].value.observe).toHaveBeenCalledWith(
      placeholders[0],
    );
    expect(observerMock.mock.results[1].value.observe).toHaveBeenCalledWith(
      placeholders[1],
    );

    await act(async () => {
      observerMock.mock.calls.forEach(([callback]) => {
        callback(
          [
            {
              isIntersecting: true,
              boundingClientRect: { height: 1 },
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        );
      });
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(getAllByTestId('onward-journey-skeleton-mostRead')).toHaveLength(2);

    await act(async () => {
      resolveFetch({ ok: true, json: async () => ({ data: { items: [] } }) });
    });
    expect(queryAllByTestId('onward-journey-skeleton-mostRead')).toHaveLength(
      0,
    );
  });
});
