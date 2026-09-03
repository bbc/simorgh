import { FOLLOWS_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import createUASStatusHook, {
  UASStatusField,
} from '#app/hooks/createUASStatusHook';

/**
 * POC (Follow Topics): fetches whether the signed-in user follows a topic.
 * Wraps the generic createUASStatusHook factory with topic-specific config.
 */
const useTopicFollowStatus = createUASStatusHook({
  config: {
    activityType: FOLLOWS_CONFIG.activityType,
    resourceDomain: FOLLOWS_CONFIG.resourceDomain,
    resourceType: FOLLOWS_CONFIG.resourceType,
  },
  queryKeyFn: (hashedUserId, topicId) =>
    uasKeys.followStatus(hashedUserId, topicId) as unknown as unknown[],
  statusField: UASStatusField.FOLLOWED,
});

export default useTopicFollowStatus;
