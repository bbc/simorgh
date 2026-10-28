import { use } from 'react';
import { useTheme } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import useTopicFollowButton, {
  FollowAction,
} from '#app/hooks/useTopicFollowButton';
import useTrackErrorEffect from '#app/hooks/useTrackErrorEffect';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useActionTooltip from '#app/hooks/useActionTooltip';
import ErrorBoundary from '#app/components/ErrorBoundary';
import SaveButton, { SAVE_BUTTON_VARIANTS } from '#app/components/SaveButton';
import ActionTooltip from '#app/components/ActionTooltip';
import getActionTooltipContent from '#app/components/ActionTooltip/ActionTooltipContent';
import getActionTooltipStatus from '#app/components/ActionTooltip/getActionTooltipStatus';

import type { FollowTopicButtonProps } from '../index';

const FollowTopicButtonAuthenticatedInner = ({
  topicData,
}: FollowTopicButtonProps) => {
  const { translations } = use(ServiceContext);
  const { followTopicButton, followTopicTooltip } = translations || {};
  const { topicId } = topicData;
  const { isDarkUi } = useTheme();

  const {
    isFollowed,
    isLoading,
    isUpdating,
    actionResult,
    resetActionResult,
    handleFollowAction,
  } = useTopicFollowButton(topicData);

  const clickComponentName = `follow-topic-button-click-${
    isFollowed ? FollowAction.UNFOLLOW : FollowAction.FOLLOW
  }`;

  const viewTracker = useViewTracker({
    componentName: 'follow-topic-button-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: clickComponentName,
    itemTracker: {
      resourceId: topicId,
    },
  });

  const {
    isTooltipVisible,
    handleTooltipClose,
    onMyNewsLinkClickTrack,
    tooltipViewTracker,
  } = useActionTooltip({
    actionResult,
    resetActionResult,
    trackingNamePrefix: 'follow-topic',
    resourceId: topicId,
    isDarkUi,
    getTooltipStatus: result =>
      getActionTooltipStatus(result, FollowAction.FOLLOW),
  });

  if (!followTopicButton) return null;

  const getVisualLabel = () => {
    if (isLoading) return followTopicButton.loading;
    if (isUpdating) {
      return isFollowed
        ? followTopicButton.unfollowing
        : followTopicButton.following;
    }
    if (isFollowed) return followTopicButton.followed;
    return followTopicButton.follow;
  };

  const getAccessibleLabel = () => {
    if (isLoading) return followTopicButton.loading;
    if (isUpdating) {
      return isFollowed
        ? followTopicButton.unfollowing
        : followTopicButton.following;
    }
    // When following, screen readers should hear the action the button performs next.
    if (isFollowed) return followTopicButton.unfollowAccessible;
    return followTopicButton.follow;
  };

  const hoverVisualLabel =
    isFollowed && !isUpdating ? followTopicButton.unfollow : undefined;

  const handleClick = (event?: React.MouseEvent) => {
    onClickTrack?.(event);
    handleFollowAction(
      isFollowed ? FollowAction.UNFOLLOW : FollowAction.FOLLOW,
    );
  };

  return (
    <>
      <SaveButton
        variant={SAVE_BUTTON_VARIANTS.FOLLOW}
        onClick={handleClick}
        isLoading={isLoading}
        isUpdating={isUpdating}
        isSaved={isFollowed}
        visualLabel={getVisualLabel()}
        hoverVisualLabel={hoverVisualLabel}
        accessibleLabel={getAccessibleLabel()}
        testId="follow-topic-btn-authorized"
        {...viewTracker}
      />
      {isTooltipVisible && actionResult && followTopicTooltip && (
        <ActionTooltip
          status={getActionTooltipStatus(actionResult, FollowAction.FOLLOW)}
          content={getActionTooltipContent(followTopicTooltip, {
            topicName: topicData.title,
            onMyNewsLinkClick: onMyNewsLinkClickTrack,
          })}
          closeLabel={followTopicTooltip.closeLabel}
          onClose={handleTooltipClose}
          {...tooltipViewTracker}
        />
      )}
    </>
  );
};

const FollowTopicButtonErrorFallback = ({ error }: { error: Error }) => {
  useTrackErrorEffect({
    error,
    feature: ERROR_TRACKING_FEATURES.FOLLOW_TOPIC_UAS,
    action: UAS_ERROR_ACTIONS.RENDER,
  });

  return null;
};

const renderFollowTopicButtonErrorFallback = (error: Error) => (
  <FollowTopicButtonErrorFallback error={error} />
);

const FollowTopicButtonAuthenticated = (props: FollowTopicButtonProps) => (
  <ErrorBoundary
    componentName="FollowTopicButtonAuthenticated"
    fallback={renderFollowTopicButtonErrorFallback}
  >
    <FollowTopicButtonAuthenticatedInner {...props} />
  </ErrorBoundary>
);

export default FollowTopicButtonAuthenticated;
