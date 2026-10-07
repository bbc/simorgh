import { use } from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
import getRecentActivity, {
  RecentActivityData,
} from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useUASRecentActivity from '.';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '../useErrorTracking/errorTracking.const';

jest.mock('#app/lib/uasApi/getRecentActivity');
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

const mockTrackError = jest.fn();
jest.mock('../useErrorTracking', () => ({
  __esModule: true,
  default: () => mockTrackError,
}));

let mockQueryFn: (opts: { signal: AbortSignal }) => Promise<RecentActivityData>;
let mockQueryKey: readonly unknown[];
let mockEnabled: boolean | undefined;
let mockUseQueryReturn: {
  data: RecentActivityData | undefined;
  isLoading: boolean;
  error: Error | null;
} = {
  data: undefined,
  isLoading: false,
  error: null,
};

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: (config: {
    queryFn: (opts: { signal: AbortSignal }) => Promise<RecentActivityData>;
    queryKey: readonly unknown[];
    enabled: boolean;
  }) => {
    mockQueryFn = config.queryFn;
    mockQueryKey = config.queryKey;
    mockEnabled = config.enabled;
    return mockUseQueryReturn;
  },
}));

const mockGetRecentActivity = getRecentActivity as jest.MockedFunction<
  typeof getRecentActivity
>;

const mockSavedArticles: SavedArticle[] = [
  {
    id: 'article-1',
    title: 'Breaking News',
    link: '/hindi/articles/article-1',
    promoImage: 'image1.jpg',
    imageAlt: 'News image',
    imageUrl: 'image1.jpg',
    type: 'article',
    description: 'Hindi',
  },
  {
    id: 'article-2',
    title: 'World Update',
    link: '/hindi/articles/article-2',
    promoImage: 'image2.jpg',
    imageAlt: 'World image',
    imageUrl: 'image2.jpg',
    type: 'article',
    description: 'Hindi',
  },
];
const hashedUserId = 'user-123';

describe('useUASRecentActivity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseQueryReturn = { data: undefined, isLoading: false, error: null };

    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext)
        return {
          hashedUserId,
          isArticlePersonalizationEnabled: true,
        };
      return {};
    });
  });

  describe('data fetching', () => {
    it('should return saved articles and total from query data', () => {
      mockUseQueryReturn.data = {
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      };

      const { result } = renderHook(() => useUASRecentActivity());

      expect(result.current.savedArticles).toEqual(mockSavedArticles);
      expect(result.current.total).toBe(25);
      expect(result.current.error).toBeNull();
    });

    it('should pass custom itemsPerPage and startIndex to getRecentActivity', async () => {
      renderHook(() =>
        useUASRecentActivity({
          itemsPerPage: 20,
          startIndex: 10,
        }),
      );

      await mockQueryFn({ signal: new AbortController().signal });

      expect(mockGetRecentActivity).toHaveBeenCalledWith(
        expect.objectContaining({
          itemsPerPage: 20,
          startIndex: 10,
        }),
      );
    });

    it('should return empty defaults when query has no data', () => {
      const { result } = renderHook(() => useUASRecentActivity());

      expect(result.current.savedArticles).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.error).toBeNull();
    });
  });

  it('should return the error from the query', () => {
    const error = new Error('Network error');
    mockUseQueryReturn.error = error;

    const { result } = renderHook(() => useUASRecentActivity());

    expect(result.current.error).toBe(error);
    expect(result.current.savedArticles).toEqual([]);
  });

  it('should track a recent-activity error when the query fails', () => {
    const error = new Error('Some error');
    mockUseQueryReturn.error = error;

    renderHook(() => useUASRecentActivity());

    expect(mockTrackError).toHaveBeenCalledWith({
      error,
      feature: ERROR_TRACKING_FEATURES.UAS,
      action: UAS_ERROR_ACTIONS.RECENT_ACTIVITY,
    });
  });

  it('should not track an error when the query succeeds', () => {
    mockUseQueryReturn.data = {
      savedArticles: mockSavedArticles,
      total: 25,
      itemsPerPage: 10,
      startIndex: 0,
    };

    renderHook(() => useUASRecentActivity());

    expect(mockTrackError).not.toHaveBeenCalled();
  });

  it('should be disabled when hashedUserId is empty', () => {
    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId: '' };
      return {};
    });

    renderHook(() => useUASRecentActivity());

    expect(mockEnabled).toBe(false);
  });

  it('should be disabled when isArticlePersonalizationEnabled is false', () => {
    (use as jest.Mock).mockImplementationOnce((context: unknown) => {
      if (context === AccountContext)
        return { isArticlePersonalizationEnabled: false };
      return {};
    });

    renderHook(() => useUASRecentActivity());

    expect(mockEnabled).toBe(false);
  });

  it('should be enabled when hashedUserId is present and isArticlePersonalizationEnabled is true', () => {
    renderHook(() => useUASRecentActivity());

    expect(mockEnabled).toBe(true);
  });

  it('should include hashedUserId and startIndex in the query key', () => {
    renderHook(() => useUASRecentActivity({ startIndex: 10 }));

    expect(mockQueryKey).toEqual(uasKeys.favouritesPage(hashedUserId, 10));
  });

  it('should include the current service in the query key and pass it to getRecentActivity', async () => {
    (use as jest.Mock).mockImplementation((context: unknown) => {
      if (context === AccountContext) return { hashedUserId };
      if (context === ServiceContext) return { service: 'mundo' };
      return {};
    });

    renderHook(() => useUASRecentActivity({ startIndex: 10 }));

    expect(mockQueryKey).toEqual(
      uasKeys.favouritesPage(hashedUserId, 10, 'mundo'),
    );

    await mockQueryFn({ signal: new AbortController().signal });

    expect(mockGetRecentActivity).toHaveBeenCalledWith(
      expect.objectContaining({ service: 'mundo' }),
    );
  });

  it('should pass AbortSignal to getRecentActivity', async () => {
    const { signal } = new AbortController();

    renderHook(() => useUASRecentActivity());

    await mockQueryFn({ signal });

    expect(mockGetRecentActivity).toHaveBeenCalledWith(
      expect.objectContaining({ signal }),
    );
  });
});
