import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { Article } from '#app/models/types/optimo';
import styles from './index.styles';

export interface SaveArticleButtonProps {
  articleId: string;
  articleTitle: string;
  articlePageData?: Article;
}

/** A button component that allows users to save an article for later reading,
 * showing the button based on user sign in status and feature toggles,
 * and displaying the saved status, loading state, and handling errors from the UAS API.
 * FUTURE TODO : Implement button click handler to toggle saved state */

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

  if (!showButton) {
    return null;
  }
  // TODO : Labels and text will be updated in a future PR to support translations and figma designs
  const buttonLabel = isSaved ? 'Remove from saved' : 'Save for later';

  const getButtonText = () => {
    if (isLoading) return 'Loading...';
    return isSaved ? 'Remove from saved' : 'Save for later';
  };

  // TODO : Will modify based on future error handling implementation,
  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error fetching saved status for article:', {
      articleId,
      error,
    });
    // return null;
  }

  return (
    <button
      css={styles.buttonWrapper}
      type="button"
      onClick={() =>
        handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE)
      }
      disabled={isLoading}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {getButtonText()}
    </button>
  );
};

export default SaveArticleButton;
