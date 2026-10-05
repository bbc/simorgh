import SaveButton from '.';
import metadata from './metadata.json';
import readme from './README.md';

export default {
  title: 'Components/SaveButton',
  component: SaveButton,
  parameters: {
    metadata,
    docs: { readme },
  },
  args: {
    onClick: () => {},
    isLoading: false,
    isUpdating: false,
    isSaved: false,
  },
};

export const Unsaved = {
  args: {
    visualLabel: 'Save for later',
    accessibleLabel: 'Save for later',
  },
};

export const Loading = {
  args: {
    isLoading: true,
    visualLabel: 'Loading',
    accessibleLabel: 'Loading',
  },
};

export const Saved = {
  args: {
    isSaved: true,
    visualLabel: 'Saved to My News',
    hoverVisualLabel: 'Remove',
    accessibleLabel: 'Remove from My News',
  },
};

export const Saving = {
  args: {
    isUpdating: true,
    visualLabel: 'Saving',
    accessibleLabel: 'Saving',
  },
};

export const Removing = {
  args: {
    isUpdating: true,
    isSaved: true,
    visualLabel: 'Removing',
    accessibleLabel: 'Removing',
  },
};

export const FollowTopicResting = {
  args: {
    variant: 'follow',
    visualLabel: 'Follow',
    accessibleLabel: 'Follow',
  },
};

export const FollowTopicLoading = {
  args: {
    variant: 'follow',
    isLoading: true,
    visualLabel: 'Loading',
    accessibleLabel: 'Loading',
  },
};

export const FollowTopicFollowingUpdating = {
  args: {
    variant: 'follow',
    isUpdating: true,
    visualLabel: 'Following',
    accessibleLabel: 'Following',
  },
};

export const FollowTopicFollowedResting = {
  args: {
    variant: 'follow',
    isSaved: true,
    visualLabel: 'Following',
    hoverVisualLabel: 'Unfollow',
    accessibleLabel: 'Unfollow this topic',
  },
};

export const FollowTopicUnfollowingUpdating = {
  args: {
    variant: 'follow',
    isUpdating: true,
    isSaved: true,
    visualLabel: 'Unfollowing',
    accessibleLabel: 'Unfollowing',
  },
};
