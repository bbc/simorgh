import useUASButton from '#app/hooks/useUASButton';
import styles from './index.styles';

interface SaveArticleButtonProps {
  isSignedIn: boolean;
  articleId: string;
  service: string;
}
/** A button component that allows users to save an article for later reading,
 * showing the button based on user sign in status and feature toggles,
 * and displaying the saved status, loading state, and handling errors from the UAS API.
 * FUTURE TODO : Implement button click handler to toggle saved state */

const SaveArticleButton = ({
  isSignedIn,
  articleId,
  service,
}: SaveArticleButtonProps) => {
  const { showButton, isSaved, loading, error } = useUASButton({
    isSignedIn,
    articleId,
    service,
  });

  if (!showButton) {
    return null;
  }
  // TODO : Labels and text will be updated in a future PR to support translations and figma designs
  const buttonLabel = isSaved ? 'Remove from saved' : 'Save for later';

  const getButtonText = () => {
    if (loading) return 'Loading...';
    return isSaved ? 'Remove from saved' : 'Save for later';
  };

  // TODO : Will modify based on future error handling implementation,
  //  currently just hides the button if there is an error fetching save status
  if (error) {
    return null;
  }

  return (
    <button
      css={styles.buttonWrapper}
      type="button"
      disabled={loading}
      aria-label={buttonLabel}
      title={buttonLabel}
    >
      {getButtonText()}
    </button>
  );
};

export default SaveArticleButton;
