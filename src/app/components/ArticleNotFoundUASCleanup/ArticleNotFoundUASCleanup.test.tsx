/**
 * @jest-environment-options {"url": "https://localhost/"}
 */
import { StrictMode } from 'react';
import Cookie from 'js-cookie';
import {
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import uasApiRequest from '#app/lib/uasApi';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { USER_ID_COOKIE_KEY } from '#app/lib/uasApi/uasUtility';
import ArticleNotFoundUASCleanup from './ArticleNotFoundUASCleanup';

jest.mock('#app/lib/uasApi');

const mockGetQueriesData = jest.fn();
const mockRemoveQueries = jest.fn();
const mockUseIsRestoring = jest.fn();
const mockQueryClient = {
  getQueriesData: mockGetQueriesData,
  removeQueries: mockRemoveQueries,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => mockQueryClient,
  useIsRestoring: () => mockUseIsRestoring(),
}));

const mockUasApiRequest = uasApiRequest as jest.Mock;

const HASHED_USER_ID = 'user-123';
const ARTICLE_ID = 'c0g992jmmkko';
const renderOptions = {
  pathname: `/news/articles/${ARTICLE_ID}`,
  idctaConfig: mockIdctaConfig,
};
const unrelatedPage = [
  uasKeys.favouritesPage(HASHED_USER_ID, 0),
  { savedArticles: [{ id: 'some-other-article' }] },
];
const cachedPages = [
  unrelatedPage,
  [
    uasKeys.favouritesPage(HASHED_USER_ID, 1),
    { savedArticles: [{ id: ARTICLE_ID }] },
  ],
];

describe('ArticleNotFoundUASCleanup', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    Cookie.set(USER_ID_COOKIE_KEY, HASHED_USER_ID, {
      secure: true,
      sameSite: 'strict',
    });
    mockUseIsRestoring.mockReturnValue(false);
    mockGetQueriesData.mockReturnValue(cachedPages);
    mockUasApiRequest.mockResolvedValue({ ok: true, status: 200 });
  });

  afterEach(() => {
    Cookie.remove(USER_ID_COOKIE_KEY, {
      secure: true,
      sameSite: 'strict',
    });
  });

  it('renders null', () => {
    mockGetQueriesData.mockReturnValue([]);
    const { container } = render(<ArticleNotFoundUASCleanup />, renderOptions);

    expect(container).toBeEmptyDOMElement();
  });

  it.each([
    { description: 'empty', pages: [] },
    { description: 'only contains other articles', pages: [unrelatedPage] },
  ])(
    'does not delete an article when the favourites cache is $description',
    async ({ pages }) => {
      mockGetQueriesData.mockReturnValue(pages);

      render(<ArticleNotFoundUASCleanup />, renderOptions);

      await waitFor(() => {
        expect(mockGetQueriesData).toHaveBeenCalledWith({
          queryKey: uasKeys.favouritesList(HASHED_USER_ID),
        });
      });
      expect(mockUasApiRequest).not.toHaveBeenCalled();
      expect(mockRemoveQueries).not.toHaveBeenCalled();
    },
  );

  it('deletes an article found on a later cached page and clears the favourites cache', async () => {
    render(<ArticleNotFoundUASCleanup />, renderOptions);

    await waitFor(() => {
      expect(mockRemoveQueries).toHaveBeenCalledWith({
        queryKey: uasKeys.favouritesList(HASHED_USER_ID),
      });
    });
    expect(mockUasApiRequest).toHaveBeenCalledWith('DELETE', 'favourites', {
      globalId: `urn:bbc:world-service-news:article:${ARTICLE_ID}`,
      isRefreshAvailable: true,
    });
  });

  it('only deletes once when StrictMode re-runs effects', async () => {
    render(
      <StrictMode>
        <ArticleNotFoundUASCleanup />
      </StrictMode>,
      renderOptions,
    );

    await waitFor(() => {
      expect(mockRemoveQueries).toHaveBeenCalledTimes(1);
    });
    expect(mockUasApiRequest).toHaveBeenCalledTimes(1);
  });

  it('waits for the persisted cache before checking whether to delete the article', async () => {
    mockUseIsRestoring.mockReturnValue(true);
    const { rerender } = render(<ArticleNotFoundUASCleanup />, renderOptions);

    expect(mockGetQueriesData).not.toHaveBeenCalled();
    expect(mockUasApiRequest).not.toHaveBeenCalled();

    mockUseIsRestoring.mockReturnValue(false);
    rerender(<ArticleNotFoundUASCleanup />);

    await waitFor(() => {
      expect(mockRemoveQueries).toHaveBeenCalledTimes(1);
    });
    expect(mockUasApiRequest).toHaveBeenCalledTimes(1);
  });
});
