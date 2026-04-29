import { useEffect, useState } from 'react';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';

interface UseRecentActivityParams {
  itemsPerPage?: number;
  startIndex?: number;
}

interface UseRecentActivityReturn {
  savedArticles: SavedArticle[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const useUASRecentActivity = ({
  itemsPerPage = 10,
  startIndex = 0,
}: UseRecentActivityParams = {}): UseRecentActivityReturn => {
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await getRecentActivity({
          itemsPerPage,
          startIndex,
          signal: abortController.signal,
        });

        setSavedArticles(result.savedArticles);
        setTotal(result.total);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load articles';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [itemsPerPage, startIndex]);

  return { savedArticles, total, isLoading, error };
};

export default useUASRecentActivity;
