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
  metadata?: Record<string, unknown>;
}

const useTopicFollowStatus = (topicId: string): UseTopicFollowStatusReturn =>
  useUASStatusHook({
    resourceId: topicId,
    config: FOLLOWS_CONFIG,
    queryKeyFn: (hashedUserId, id) => uasKeys.followStatus(hashedUserId, id),
    statusField: UASStatusField.FOLLOWED,
    enabledFn: (id, hashedUserId) => !!id && !!hashedUserId,
  });

export default useTopicFollowStatus;
