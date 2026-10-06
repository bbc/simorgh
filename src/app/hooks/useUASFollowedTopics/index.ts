import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import getFollowedTopics from '#app/lib/uasApi/getFollowedTopics';
import type { FollowedTopic } from '#app/lib/uasApi/getFollowedTopics';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';

interface UseFollowedTopicsParams {
  itemsPerPage?: number;
  startIndex?: number;
  enabled?: boolean;
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
  enabled = false,
}: UseFollowedTopicsParams = {}): UseFollowedTopicsReturn => {
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const isQueryEnabled = !!hashedUserId && enabled;

  const { data, isLoading, error } = useQuery({
    queryKey: uasKeys.followsList(hashedUserId),
    queryFn: ({ signal }) =>
      getFollowedTopics({
        itemsPerPage,
        startIndex,
        signal,
        isRefreshAvailable,
      }),
    enabled: isQueryEnabled,
  });

  // required to prevent from showing cached data when not expected
  if (!isQueryEnabled) {
    return {
      followedTopics: [],
      total: 0,
      isLoading: false,
      error: null,
    };
  }

  return {
    followedTopics: data?.followedTopics ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASFollowedTopics;
