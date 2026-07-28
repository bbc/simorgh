import { FOLLOWS_CONFIG } from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useUASStatusHook, { UASStatusField } from '#app/hooks/useUASStatusHook';

/**
 * POC (Follow Topics): fetches whether the signed-in user follows a topic.
 * Wraps the generic useUASStatusHook factory with topic-specific config.
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
const useTopicFollowStatus = useUASStatusHook({
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
