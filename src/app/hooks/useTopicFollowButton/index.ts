import { use } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import {
  createFollowsPayload,
  FOLLOWS_CONFIG,
  type TopicFollowData,
  buildGlobalId,
} from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import { AccountContext } from '#app/contexts/AccountContext';
import useTopicFollowStatus from '#app/hooks/useTopicFollowStatus';

enum FollowAction {
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
}

interface UseTopicFollowButtonReturn {
  isFollowed: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  handleFollowAction: (action: FollowAction) => void;
}

const useTopicFollowButton = (
  topicData: TopicFollowData,
): UseTopicFollowButtonReturn => {
  const { topicId } = topicData;
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const queryClient = useQueryClient();
  const { isFollowed, isLoading, error } = useTopicFollowStatus(topicId);

  const mutation = useMutation({
    mutationFn: async (action: FollowAction) => {
      if (action === FollowAction.FOLLOW) {
        const body = createFollowsPayload(topicData);
        await uasApiRequest('POST', FOLLOWS_CONFIG.activityType, {
          body,
          isRefreshAvailable,
        });
        return;
      }
      const globalId = buildGlobalId(
        topicId,
        FOLLOWS_CONFIG.resourceDomain,
        FOLLOWS_CONFIG.resourceType,
      );
      await uasApiRequest('DELETE', FOLLOWS_CONFIG.activityType, {
        globalId,
        isRefreshAvailable,
      });
    },
    onSuccess: (_result, action) => {
      queryClient.setQueryData(uasKeys.followStatus(hashedUserId, topicId), {
        isFollowed: action === FollowAction.FOLLOW,
      });
      queryClient.invalidateQueries({
        queryKey: uasKeys.followsList(hashedUserId),
      });
    },
  });

  return {
    isFollowed,
    isLoading,
    isUpdating: mutation.isPending,
    error: mutation.error || error,
    handleFollowAction: mutation.mutate,
  };
};

export { FollowAction };
export default useTopicFollowButton;
