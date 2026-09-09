import { use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import useErrorTracking from '../useErrorTracking';

interface UseRecentActivityParams {
  itemsPerPage?: number;
  startIndex?: number;
}

interface UseRecentActivityReturn {
  savedArticles: SavedArticle[];
  total: number;
  isLoading: boolean;
  error: Error | null;
}

const useUASRecentActivity = ({
  itemsPerPage = 10,
  startIndex = 0,
}: UseRecentActivityParams = {}): UseRecentActivityReturn => {
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);

  const trackError = useErrorTracking();

  const { data, isLoading, error } = useQuery({
    queryKey: uasKeys.favouritesPage(hashedUserId, startIndex),
    queryFn: ({ signal }) =>
      getRecentActivity({
        itemsPerPage,
        startIndex,
        signal,
        isRefreshAvailable,
      }),
    enabled: !!hashedUserId,
  });

  useEffect(() => {
    if (error) {
      trackError({ error, feature: 'uas', action: 'recent-activity' });
    }
  }, [error, trackError]);

  return {
    savedArticles: data?.savedArticles ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASRecentActivity;
