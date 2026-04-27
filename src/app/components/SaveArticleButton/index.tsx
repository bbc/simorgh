import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { useContext } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
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

  const { translations } = useContext(ServiceContext);
  const { saveArticleButton } = translations || {};

  if (!showButton) return null;

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
    <ActionButton
      onClick={handleClick}
      isLoading={isLoading}
      isSaved={isSaved}
      disabled={isLoading}
      buttonText={buttonText}
      removeText={saveArticleButton.remove}
    />
  );
};

export default SaveArticleButton;
