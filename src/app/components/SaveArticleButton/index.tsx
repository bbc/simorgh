import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { useState, useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import { Article } from '#app/models/types/optimo';
import SaveButton from '../SaveButton';
import styles from './index.styles';
import AccountPromotionalBannerModal from '../Account/AccountPromotionalBanner/AccountPromotionalModal';

export interface SaveArticleButtonProps {
  articleId: string;
  articleTitle: string;
  articlePageData?: Article;
}

const SaveArticleButton = ({
  articleId,
  articleTitle,
  articlePageData,
}: SaveArticleButtonProps) => {
  const { showButton, isSaved, isLoading, error, handleSaveAction } =
    useUASButton({
      articleId,
      articleTitle,
      articlePageData,
    });

  const { translations } = useContext(ServiceContext);
  const { saveArticleButton } = translations || {};
  const { isSignedIn } = useContext(AccountContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!showButton && isSignedIn) return null;
  if (!saveArticleButton) return null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error fetching saved status for article:', {
      articleId,
      error,
    });
  }

  const buttonLabel = isSaved
    ? saveArticleButton.saved
    : saveArticleButton.save;

  const buttonText = isLoading ? saveArticleButton.saving : buttonLabel;

  const handleClick = () => {
    if (!isSignedIn) {
      setIsModalOpen(true);
      return;
    }
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <div css={styles.buttonWrapper}>
      <SaveButton
        onClick={handleClick}
        isLoading={isLoading}
        isSaved={isSaved}
        disabled={isLoading}
        buttonText={buttonText}
        removeText={saveArticleButton.remove}
      />
      {isModalOpen && (
        <AccountPromotionalBannerModal
          isSignedIn={false}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SaveArticleButton;
