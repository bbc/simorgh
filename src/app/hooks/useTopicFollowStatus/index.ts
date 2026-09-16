import { FOLLOWS_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useUASStatusHook, {
  UASStatusField,
} from '#app/hooks/createUASStatusHook';

/**
 * POC (Follow Topics): fetches whether the signed-in user follows a topic.
 * Wraps the generic useUASStatusHook with topic-specific config.
 */
const useTopicFollowStatus = (topicId: string) =>
  useUASStatusHook({
    resourceId: topicId,
    config: FOLLOWS_CONFIG,
    queryKeyFn: (hashedUserId, id) =>
      uasKeys.followStatus(hashedUserId, id) as unknown as unknown[],
    statusField: UASStatusField.FOLLOWED,
    enabledFn: (id, hashedUserId) => !!id && !!hashedUserId,
  });

export default useTopicFollowStatus;
