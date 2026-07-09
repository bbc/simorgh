import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use, useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountSignInModal from '#app/components/Account/AccountSignInModal';
import { createPortal } from 'react-dom';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';

const SaveArticleButtonGuest = () => {
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);
  const isHydrated = useHydrationDetection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saveArticleButton } = translations || {};

  const label = isHydrated
    ? saveArticleButton?.save
    : saveArticleButton?.loading;

  const viewTracker = useViewTracker({
    componentName: 'save-article-button-guest-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: 'save-article-button-guest-click-save',
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
        testId="save-article-btn-guest"
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

export default SaveArticleButtonGuest;
