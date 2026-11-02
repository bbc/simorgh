import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import getRecentActivity from '#app/lib/uasApi/getRecentActivity';
import type { SavedArticle } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useTrackErrorEffect from '#app/hooks/useTrackErrorEffect';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '../useErrorTracking/errorTracking.const';

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
  const {
    hashedUserId = '',
    isRefreshAvailable,
    isArticlePersonalizationEnabled,
  } = use(AccountContext);
  const { service } = use(ServiceContext);

  const isQueryEnabled = !!hashedUserId && isArticlePersonalizationEnabled;

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

  useTrackErrorEffect({
    error,
    feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
    action: UAS_ERROR_ACTIONS.FETCH_ACTIVITY,
  });

  return {
    savedArticles: data?.savedArticles ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASRecentActivity;
