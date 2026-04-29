import {
  renderHook,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import useUASRecentActivity from '.';

jest.mock('#app/lib/uasApi/getRecentActivity');

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

describe('useUASRecentActivity', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('data fetching', () => {
    it('should fetch and return saved articles on mount', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const { result } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.savedArticles).toEqual(mockSavedArticles);
      expect(result.current.total).toBe(25);
      expect(result.current.error).toBeNull();
    });

    it('should accept custom itemsPerPage and startIndex', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: [mockSavedArticles[1]],
        total: 15,
        itemsPerPage: 20,
        startIndex: 10,
      });

      renderHook(() =>
        useUASRecentActivity({
          itemsPerPage: 20,
          startIndex: 10,
        }),
      );

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledWith(
          expect.objectContaining({
            itemsPerPage: 20,
            startIndex: 10,
          }),
        );
      });
    });

    it('should handle empty article list', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: [],
        total: 0,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const { result } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.savedArticles).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.error).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should handle fetch errors gracefully', async () => {
      const errorMessage = 'Network error';
      mockGetRecentActivity.mockRejectedValueOnce(new Error(errorMessage));

      const { result } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe(errorMessage);
      expect(result.current.savedArticles).toEqual([]);
    });

    it('should handle non-Error exceptions with default message', async () => {
      mockGetRecentActivity.mockRejectedValueOnce('String error');

      const { result } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBe('Failed to load articles');
    });

    it('should not set error on AbortError', async () => {
      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';
      mockGetRecentActivity.mockRejectedValueOnce(abortError);

      const { result } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('loading state', () => {
    it('should start with loading state and transition to loaded', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const { result } = renderHook(() => useUASRecentActivity());

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.savedArticles).toEqual(mockSavedArticles);
    });
  });

  describe('abort controller', () => {
    it('should pass AbortSignal to getRecentActivity', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledWith(
          expect.objectContaining({
            signal: expect.any(AbortSignal),
          }),
        );
      });
    });

    it('should abort request on component unmount', async () => {
      mockGetRecentActivity.mockResolvedValueOnce({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

      const { unmount } = renderHook(() => useUASRecentActivity());

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalled();
      });

      unmount();

      expect(abortSpy).toHaveBeenCalled();
      abortSpy.mockRestore();
    });
  });

  describe('dependency array', () => {
    it('should refetch when startIndex changes', async () => {
      mockGetRecentActivity.mockResolvedValue({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const { rerender } = renderHook(
        ({ startIndex }: { startIndex: number }) =>
          useUASRecentActivity({ startIndex }),
        {
          initialProps: { startIndex: 0 },
        },
      );

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledTimes(1);
      });

      rerender({ startIndex: 10 });

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledTimes(2);
      });

      expect(mockGetRecentActivity).toHaveBeenLastCalledWith(
        expect.objectContaining({
          startIndex: 10,
        }),
      );
    });

    it('should refetch when itemsPerPage changes', async () => {
      mockGetRecentActivity.mockResolvedValue({
        savedArticles: mockSavedArticles,
        total: 25,
        itemsPerPage: 10,
        startIndex: 0,
      });

      const { rerender } = renderHook(
        ({ itemsPerPage }: { itemsPerPage: number }) =>
          useUASRecentActivity({ itemsPerPage }),
        {
          initialProps: { itemsPerPage: 10 },
        },
      );

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledTimes(1);
      });

      rerender({ itemsPerPage: 20 });

      await waitFor(() => {
        expect(mockGetRecentActivity).toHaveBeenCalledTimes(2);
      });

      expect(mockGetRecentActivity).toHaveBeenLastCalledWith(
        expect.objectContaining({
          itemsPerPage: 20,
        }),
      );
    });
  });
});
