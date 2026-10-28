import { use, useState } from 'react';
import {
  onlineManager,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import uasApiRequest from '#app/lib/uasApi';
import {
  createFollowsPayload,
  FOLLOWS_CONFIG,
  type FollowTopicData,
  buildGlobalId,
} from '#app/lib/uasApi/uasUtility';
import uasKeys from '#app/lib/uasApi/queryKeys';
import useErrorTracking from '#app/hooks/useErrorTracking';
import useTrackErrorEffect from '#app/hooks/useTrackErrorEffect';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import { AccountContext } from '#app/contexts/AccountContext';
import useTopicFollowStatus from '#app/hooks/useTopicFollowStatus';
import { ServiceContext } from '#app/contexts/ServiceContext';
import useUASMetadataSync from '../useUASMetadataSync';

enum FollowAction {
  FOLLOW = 'follow',
  UNFOLLOW = 'unfollow',
}

export type FollowActionResult = {
  status: 'success' | 'error';
  action: FollowAction;
} | null;

interface UseTopicFollowButtonReturn {
  isFollowed: boolean;
  isLoading: boolean;
  isUpdating: boolean;
  error: Error | null;
  actionResult: FollowActionResult;
  resetActionResult: () => void;
  handleFollowAction: (action: FollowAction) => void;
}

const useTopicFollowButton = (
  topicData: FollowTopicData,
): UseTopicFollowButtonReturn => {
  const { topicId } = topicData;
  const { service } = use(ServiceContext);
  const { hashedUserId = '', isRefreshAvailable } = use(AccountContext);
  const queryClient = useQueryClient();
  const trackError = useErrorTracking();
  const {
    isFollowed,
    isLoading,
    error,
    metadata: savedMetadata,
  } = useTopicFollowStatus(topicId);

  useTrackErrorEffect({
    error,
    feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
    action: UAS_ERROR_ACTIONS.FETCH_STATUS,
  });

  const [actionResult, setActionResult] = useState<FollowActionResult>(null);

  const mutation = useMutation({
    mutationFn: async (action: FollowAction) => {
      if (action === FollowAction.FOLLOW) {
        const body = createFollowsPayload(topicData, service);
        await uasApiRequest('POST', FOLLOWS_CONFIG.activityType, {
          body,
          isRefreshAvailable,
        });
        return body.metaData;
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

      return undefined;
    },
    onSuccess: (metadata, action) => {
      const isFollowedAction = action === FollowAction.FOLLOW;

      queryClient.setQueryData(uasKeys.followStatus(hashedUserId, topicId), {
        isFollowed: isFollowedAction,
        metadata: isFollowedAction ? metadata : undefined,
      });
      queryClient.invalidateQueries({
        queryKey: uasKeys.followsList(hashedUserId),
      });
    },
  });

  const handleMetadataOutOfDate = () =>
    mutation.mutate(FollowAction.FOLLOW, {
      onError: mutationError =>
        trackError({
          error: mutationError,
          feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
          action: UAS_ERROR_ACTIONS.METADATA_SYNC,
        }),
    });

  useUASMetadataSync({
    followTopicPageData: topicData,
    topicId,
    service,
    isFollowed,
    savedTopicMetadata: savedMetadata,
    onMetadataOutOfDate: handleMetadataOutOfDate,
  });

  const handleFollowAction = (action: FollowAction) => {
    if (!onlineManager.isOnline()) {
      setActionResult({ status: 'error', action });
      return undefined;
    }

    return mutation.mutate(action, {
      onSuccess: () => setActionResult({ status: 'success', action }),
      onError: mutationError => {
        setActionResult({ status: 'error', action });
        trackError({
          error: mutationError,
          feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
          action,
        });
      },
    });
  };

  const resetActionResult = () => {
    setActionResult(null);
    mutation.reset();
  };

  return {
    isFollowed,
    isLoading,
    isUpdating: mutation.isPending && !mutation.isPaused,
    error: mutation.error || error,
    actionResult,
    resetActionResult,
    handleFollowAction,
  };
};

export { FollowAction };
export default useTopicFollowButton;
