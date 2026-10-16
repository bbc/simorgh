import { FOLLOWS_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useUASStatusHook, { UASStatusField } from '#app/hooks/useUASStatusHook';

/**
 * Fetches whether the signed-in user follows a topic.
 * Wraps the generic useUASStatusHook with topic-specific config.
 */

interface UseTopicFollowStatusReturn {
  isFollowed: boolean;
  isLoading: boolean;
  error: Error | null;
  savedMetadata?: Record<string, unknown>;
}

const useTopicFollowStatus = (topicId: string): UseTopicFollowStatusReturn => {
  const { isFollowed, isLoading, error, metadata } = useUASStatusHook({
    resourceId: topicId,
    config: FOLLOWS_CONFIG,
    queryKeyFn: (hashedUserId, id) => uasKeys.followStatus(hashedUserId, id),
    statusField: UASStatusField.FOLLOWED,
    enabledFn: (id, hashedUserId) => !!id && !!hashedUserId,
  });

  return {
    isFollowed,
    isLoading,
    error,
    savedMetadata: metadata,
  };
};

export default useTopicFollowStatus;
