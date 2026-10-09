import { use, StrictMode } from 'react';
import { render, waitFor } from '@testing-library/react';
import { AccountContext } from '#app/contexts/AccountContext';
import { RequestContext } from '#app/contexts/RequestContext';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import parseRoute from '#app/routes/utils/parseRoute';
import ArticleNotFoundUASCleanup from './ArticleNotFoundUASCleanup';

jest.mock('#app/lib/uasApi');
jest.mock('#app/routes/utils/parseRoute');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockGetQueriesData = jest.fn();
const mockRemoveQueries = jest.fn();
const mockQueryClient = {
  getQueriesData: mockGetQueriesData,
  removeQueries: mockRemoveQueries,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => mockQueryClient,
}));

const mockUse = use as jest.Mock;
const mockUasApiRequest = uasApiRequest as jest.Mock;
const mockParseRoute = parseRoute as jest.Mock;

const HASHED_USER_ID = 'user-123';
const ARTICLE_ID = 'article-123';

describe('ArticleNotFoundUASCleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUse.mockImplementation(context => {
      if (context === AccountContext)
        return { hashedUserId: HASHED_USER_ID, isRefreshAvailable: true };
      if (context === RequestContext)
        return { pathname: '/news/articles/article-123' };
      return {};
    });

    mockParseRoute.mockReturnValue({ assetId: ARTICLE_ID });
    mockGetQueriesData.mockReturnValue([]);
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });
  });

  it('renders null', () => {
    const { container } = render(<ArticleNotFoundUASCleanup />);

    expect(container).toBeEmptyDOMElement();
  });

  it('calls getQueriesData with the queryKey from uasKeys.favouritesList(hashedUserId)', async () => {
    render(<ArticleNotFoundUASCleanup />);

    await waitFor(() => {
      expect(mockGetQueriesData).toHaveBeenCalledWith({
        queryKey: uasKeys.favouritesList(HASHED_USER_ID),
      });
    });
  });

  it('does not call uasApiRequest when articleId is not present in any cached favourites page', async () => {
    mockGetQueriesData.mockReturnValue([
      [
        uasKeys.favouritesPage(HASHED_USER_ID, 0),
        { savedArticles: [{ id: 'some-other-article' }] },
      ],
    ]);

    render(<ArticleNotFoundUASCleanup />);

    await waitFor(() => {
      expect(mockGetQueriesData).toHaveBeenCalled();
    });
    expect(mockUasApiRequest).not.toHaveBeenCalled();
  });

  it('proceeds with deletion when articleId is found on one of several cached pages', async () => {
    mockGetQueriesData.mockReturnValue([
      [
        uasKeys.favouritesPage(HASHED_USER_ID, 0),
        { savedArticles: [{ id: 'some-other-article' }] },
      ],
      [
        uasKeys.favouritesPage(HASHED_USER_ID, 1),
        { savedArticles: [{ id: ARTICLE_ID }] },
      ],
    ]);

    render(<ArticleNotFoundUASCleanup />);

    await waitFor(() => {
      expect(mockUasApiRequest).toHaveBeenCalledWith('DELETE', 'favourites', {
        globalId: `urn:bbc:world-service-news:article:${ARTICLE_ID}`,
        isRefreshAvailable: true,
      });
    });
  });

  it('calls queryClient.removeQueries with the favouritesList queryKey after a successful delete', async () => {
    mockGetQueriesData.mockReturnValue([
      [
        uasKeys.favouritesPage(HASHED_USER_ID, 0),
        { savedArticles: [{ id: ARTICLE_ID }] },
      ],
    ]);

    render(<ArticleNotFoundUASCleanup />);

    await waitFor(() => {
      expect(mockRemoveQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.favouritesList(HASHED_USER_ID),
      });
    });
  });

  it('only calls uasApiRequest once even if the effect re-runs with the same hashedUserId/articleId', async () => {
    mockGetQueriesData.mockReturnValue([
      [
        uasKeys.favouritesPage(HASHED_USER_ID, 0),
        { savedArticles: [{ id: ARTICLE_ID }] },
      ],
    ]);

    // StrictMode intentionally mounts, cleans up, and remounts on initial
    // render, invoking effects twice with identical deps. This is what
    // hasAttemptedDeletion.current guards against in the component.
    render(
      <StrictMode>
        <ArticleNotFoundUASCleanup />
      </StrictMode>,
    );

    await waitFor(() => {
      expect(mockRemoveQueries).toHaveBeenCalledTimes(1);
    });
    expect(mockUasApiRequest).toHaveBeenCalledTimes(1);
  });
});
