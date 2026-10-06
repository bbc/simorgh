import { use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useErrorTracking from '../useErrorTracking';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '../useErrorTracking/errorTracking.const';

interface UseRecentActivityParams {
  itemsPerPage?: number;
  startIndex?: number;
  enabled?: boolean;
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
  enabled = false,
}: UseRecentActivityParams = {}): UseRecentActivityReturn => {
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const { service } = use(ServiceContext);

  const trackError = useErrorTracking();
  const isQueryEnabled = !!hashedUserId && enabled;

  const { data, isLoading, error } = useQuery({
    queryKey: uasKeys.favouritesPage(hashedUserId, startIndex, service),
    queryFn: ({ signal }) =>
      getRecentActivity({
        itemsPerPage,
        startIndex,
        signal,
        isRefreshAvailable,
        service,
      }),
    enabled: isQueryEnabled,
  });

  useEffect(() => {
    if (error) {
      trackError({
        error,
        feature: ERROR_TRACKING_FEATURES.UAS,
        action: UAS_ERROR_ACTIONS.RECENT_ACTIVITY,
      });
    }
  }, [error, trackError]);

  // required to prevent from showing cached data when not expected
  if (!isQueryEnabled) {
    return {
      savedArticles: [],
      total: 0,
      isLoading: false,
      error: null,
    };
  }

  return {
    savedArticles: data?.savedArticles ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASRecentActivity;
