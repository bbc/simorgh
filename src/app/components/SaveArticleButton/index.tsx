import useUASButton from '#app/hooks/useUASButton';
import styles from './index.styles';

interface SaveArticleButtonProps {
  articleId: string;
  service: string;
  title: string;
}

const SaveArticleButton = ({
  articleId,
  service,
  title,
}: SaveArticleButtonProps) => {
  const { showButton, isSaved, isLoading, error, handleSaveArticle } =
    useUASButton({
      articleId,
      service,
      title,
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
  //  currently just hides the button if there is an error fetching save status
  if (error) {
    // Logging until we have proper error handling in place
    // eslint-disable-next-line no-console
    console.log('Error fetching saved status for article:', {
      articleId,
      error,
    });
    return null;
  }

  return (
    <button
      css={styles.buttonWrapper}
      type="button"
      onClick={handleSaveArticle}
      disabled={isLoading}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {getButtonText()}
    </button>
  );
};

export default SaveArticleButton;
