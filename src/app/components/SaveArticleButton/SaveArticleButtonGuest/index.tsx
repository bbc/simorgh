import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use, useState } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountPromotionalBannerModal from '#app/components/Account/AccountPromotionalBanner/AccountPromotionalModal';

const SaveArticleButtonGuest = () => {
  const { translations } = use(ServiceContext);
  const { signInUrl, registerUrl } = use(AccountContext);
  const isHydrated = useHydrationDetection();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getButtonText = () => {
    if (!isHydrated) {
      return translations.saveArticleButton?.loading;
    }
    return translations.saveArticleButton?.save;
  };

  return (
    <>
      <SaveButton
        onClick={() => setIsModalOpen(true)}
        buttonText={getButtonText()}
        testId="save-article-btn-guest"
        isLoading={!isHydrated}
      />
      {isModalOpen && (
        <AccountPromotionalBannerModal
          onClose={() => setIsModalOpen(false)}
          signInUrl={signInUrl}
          registerUrl={registerUrl}
        />
      )}
    </>
  );
};

export default SaveArticleButtonGuest;
