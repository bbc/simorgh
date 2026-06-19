import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use } from 'react';
import useHydrationDetection from '#app/hooks/useHydrationDetection';

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
        // eslint-disable-next-line no-alert
        alert('Please sign in to save articles.');
      }}
      buttonText={getButtonText()}
      testId="save-article-btn-guest"
      isLoading={!isHydrated}
    />
  );
};

export default SaveArticleButtonGuest;
