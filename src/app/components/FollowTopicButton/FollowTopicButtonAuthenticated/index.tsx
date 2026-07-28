import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import useTopicFollowButton, {
  FollowAction,
} from '#app/hooks/useTopicFollowButton';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import SaveButton from '#app/components/SaveButton';

import type { FollowTopicButtonProps } from '../index';

const FollowTopicButtonAuthenticated = ({
  topicData,
}: FollowTopicButtonProps) => {
  const { translations } = use(ServiceContext);
  const { followTopicButton } = translations || {};
  const { topicId } = topicData;

  const { isFollowed, isLoading, isUpdating, handleFollowAction } =
    useTopicFollowButton(topicData);

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

  if (!followTopicButton) return null;

  const getVisualLabel = () => {
    if (isLoading) return followTopicButton.loading;
    if (isUpdating) {
      return isFollowed
        ? followTopicButton.unfollowing
        : followTopicButton.followingAction;
    }
    if (isFollowed) return followTopicButton.following;
    return followTopicButton.follow;
  };

  const getAccessibleLabel = () => {
    if (isLoading) return followTopicButton.loading;
    if (isUpdating) {
      return isFollowed
        ? followTopicButton.unfollowing
        : followTopicButton.followingAction;
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
    <SaveButton
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
  );
};

export default FollowTopicButtonAuthenticated;
