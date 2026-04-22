import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import ActionButton from '../ActionButton';

interface SaveArticleButtonProps {
  articleId: string;
  articleTitle: string;
}

const SaveArticleButton = ({
  articleId,
  articleTitle,
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

  const buttonLabel = isSaved ? 'Saved to My News' : 'Save for later';
  const buttonText = isLoading ? 'Saving' : buttonLabel;

  const handleClick = () => {
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <div css={{ margin: '1.5rem 0.5rem' }}>
      <ActionButton
        onClick={handleClick}
        isLoading={isLoading}
        isSaved={isSaved}
        disabled={isLoading}
        label={buttonLabel}
        buttonText={buttonText}
      />
    </div>
  );
};

export default SaveArticleButton;
