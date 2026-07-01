import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use, useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountSignInModal from '#app/components/Account/AccountSignInModal';
import { createPortal } from 'react-dom';

const SaveArticleButtonGuest = () => {
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);
  const isHydrated = useHydrationDetection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { saveArticleButton } = translations || {};

  const label = isHydrated
    ? saveArticleButton?.save
    : saveArticleButton?.loading;

  return (
    <>
      <SaveButton
        onClick={() => setIsModalOpen(true)}
        visualLabel={label ?? ''}
        accessibleLabel={label ?? ''}
        testId="save-article-btn-guest"
        isLoading={!isHydrated}
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
