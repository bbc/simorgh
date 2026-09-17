import { use, useState } from 'react';
import { createPortal } from 'react-dom';
import { ServiceContext } from '#contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import SaveButton from '#app/components/SaveButton';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import AccountSignInModal from '#app/components/Account/AccountSignInModal';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';

interface FollowTopicButtonGuestProps {
  topicId?: string;
}

const FollowTopicButtonGuest = ({ topicId }: FollowTopicButtonGuestProps) => {
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);
  const isHydrated = useHydrationDetection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { followTopicButton } = translations || {};

  const label = isHydrated
    ? followTopicButton?.follow
    : followTopicButton?.loading;

  const viewTracker = useViewTracker({
    componentName: 'follow-topic-button-guest-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: 'follow-topic-button-guest-click-follow',
    itemTracker: {
      resourceId: topicId,
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickTrack?.(e);
    setIsModalOpen(true);
  };

  return (
    <>
      <SaveButton
        onClick={handleClick}
        visualLabel={label ?? ''}
        accessibleLabel={label ?? ''}
        testId="follow-topic-btn-guest"
        isLoading={!isHydrated}
        {...viewTracker}
      />
      {isModalOpen &&
        createPortal(
          <AccountSignInModal
            onClose={() => setIsModalOpen(false)}
            signInUrl={signInUrl}
            registerUrl={registerUrl}
          />,
          document.body,
        )}
    </>
  );
};

export default FollowTopicButtonGuest;
