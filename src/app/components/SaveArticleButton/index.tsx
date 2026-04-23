import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import styles from './index.styles';

type SaveArticleButtonProps = {
  articleId: string;
  articleTitle: string;
};

/** A button component that allows users to save an article for later reading,
 * showing the button based on user sign in status and feature toggles,
 * and displaying the saved status, loading state, and handling errors from the UAS API.
 */

const SaveArticleButton = ({
  articleId,
  articleTitle,
}: SaveArticleButtonProps) => {
  const { showButton, isSaved, isLoading, error, handleSaveAction } =
    useUASButton({
      articleId,
      articleTitle,
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
