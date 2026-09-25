import { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import getFollowedTopics from '#app/lib/uasApi/getFollowedTopics';
import type { FollowedTopic } from '#app/lib/uasApi/getFollowedTopics';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';

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
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);

  const { data, isLoading, error } = useQuery({
    queryKey: uasKeys.followsList(hashedUserId),
    queryFn: ({ signal }) =>
      getFollowedTopics({
        itemsPerPage,
        startIndex,
        signal,
        isRefreshAvailable,
      }),
    enabled: !!hashedUserId,
  });

  return {
    followedTopics: data?.followedTopics ?? [],
    total: data?.total ?? 0,
    isLoading,
    error,
  };
};

export default useUASFollowedTopics;
