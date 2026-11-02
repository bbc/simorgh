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
          <OnwardJourneyPlaceholder onwardJourney="mostRead" />
        </ArticleOnwardJourneysProvider>
      </RequestContextProvider>,
    );

    expect(getByTestId('onward-journey-skeleton-mostRead')).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();

    await waitFor(() =>
      expect(global.IntersectionObserver).toHaveBeenCalledTimes(1),
    );

    act(() => {
      intersectionObserverCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    await waitFor(() => expect(mockFetch).toHaveBeenCalledTimes(1));
    expect(
      new URL(mockFetch.mock.calls[0][0]).searchParams.get('onwardJourney'),
    ).toBe('mostRead');
  });
});
