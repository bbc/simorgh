import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { use } from 'react';

// TODO: This will contain the guest user experience for the SaveArticleButton,
// which will likely involve prompting the user to sign in or create an account to save articles.
const SaveArticleButtonGuest = () => {
  const { translations } = use(ServiceContext);

  return (
    <SaveButton
      onClick={() => {
        // eslint-disable-next-line no-alert
        alert('Please sign in to save articles.');
      }}
      buttonText={translations.saveArticleButton?.save || 'Save'}
      testId="save-article-btn-guest"
    />
  );
};

export default SaveArticleButtonGuest;
