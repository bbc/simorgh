import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { Article } from '#app/models/types/optimo';
import SaveButton from '../SaveButton';
import styles from './index.styles';

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
  const { isSaved, isLoading, error, handleSaveAction } = useUASButton({
    articleId,
    articleTitle,
    articlePageData,
  });

  const { translations } = useContext(ServiceContext);
  const { saveArticleButton } = translations || {};

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
    </div>
  );
};

export default SaveArticleButton;
