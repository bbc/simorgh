import { use, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import getFollowedTopics from '#app/lib/uasApi/getFollowedTopics';
import type { FollowedTopic } from '#app/lib/uasApi/getFollowedTopics';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useErrorTracking from '../useErrorTracking';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '../useErrorTracking/errorTracking.const';

interface UseFollowedTopicsParams {
  itemsPerPage?: number;
  startIndex?: number;
}

interface UseFollowedTopicsReturn {
  followedTopics: FollowedTopic[];
  total: number;
  isLoading: boolean;
  error: Error | null;
}

const useUASFollowedTopics = ({
  itemsPerPage = 10,
  startIndex = 0,
}: UseFollowedTopicsParams = {}): UseFollowedTopicsReturn => {
  const {
    hashedUserId = '',
    isRefreshAvailable,
    isTopicPersonalizationEnabled,
  } = use(AccountContext);
  const { service } = use(ServiceContext);

  const isQueryEnabled = !!hashedUserId && isTopicPersonalizationEnabled;

  const trackError = useErrorTracking();

  const { data, isLoading, error } = useQuery({
    queryKey: uasKeys.followsPage(
      hashedUserId,
      startIndex,
      itemsPerPage,
      service,
    ),
    queryFn: ({ signal }) =>
      getFollowedTopics({
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
        action: UAS_ERROR_ACTIONS.FOLLOWED_TOPICS,
      });
    }
  }, [error, trackError]);

  return {
    followedTopics: data?.followedTopics ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASFollowedTopics;
