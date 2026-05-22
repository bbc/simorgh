import { use } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';

import SaveButton from '#app/components/SaveButton';
import { ServiceContext } from '#contexts/ServiceContext';

// TODO: This will contain the guest user experience for the SaveArticleButton,
// which will likely involve prompting the user to sign in or create an account to save articles.
const SaveArticleButtonGuest = () => {
  const { translations } = use(ServiceContext);
  const isHydrated = useHydrationDetection();
  const getButtonText = () => {
    if (!isHydrated) {
      return translations.saveArticleButton?.loading;
    }
    return translations.saveArticleButton?.save;
  };

  return (
    <SaveButton
      onClick={() => {
        // biome-ignore lint/suspicious/noAlert: we want this temporarily
        alert('Please sign in to save articles.');
      }}
      buttonText={getButtonText()}
      testId="save-article-btn-guest"
      isLoading={!isHydrated}
    />
  );
};

export default SaveArticleButtonGuest;
