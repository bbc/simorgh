import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import ActionButton from '../ActionButton';

interface SaveArticleButtonProps {
  articleId: string;
  articleTitle: string;
  onSignInRequired?: () => void;
}

const SaveArticleButton = ({
  articleId,
  articleTitle,
  onSignInRequired,
}: SaveArticleButtonProps) => {
  const { showButton, isSaved, isLoading, error, handleSaveAction } =
    useUASButton({ articleId, articleTitle });

  if (!showButton) return null;

  if (error) {
    // eslint-disable-next-line no-console
    console.log('Error fetching saved status for article:', {
      articleId,
      error,
    });
  }

  const buttonLabel = isSaved ? 'Remove from saved' : 'Save for later';
  const buttonText = isLoading ? 'Saving' : buttonLabel;

  const handleClick = () => {
    if (onSignInRequired) {
      onSignInRequired();
      return;
    }
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <ActionButton
      onClick={handleClick}
      isLoading={isLoading}
      isSaved={isSaved}
      disabled={isLoading}
      label={buttonLabel}
      buttonText={buttonText}
    />
  );
};

export default SaveArticleButton;
