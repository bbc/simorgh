import { use } from 'react';
import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import { Article } from '#app/models/types/optimo';

export interface SaveArticleButtonProps {
  articleId: string;
  articleTitle: string;
  articlePageData?: Article;
}

const SaveArticleButtonAuthenticated = ({
  articleId,
  articleTitle,
  articlePageData,
}: SaveArticleButtonProps) => {
  const { isSaved, isLoading, error, handleSaveAction } = useUASButton({
    articleId,
    articleTitle,
    articlePageData,
  });

  const { translations } = use(ServiceContext);
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
    <SaveButton
      onClick={handleClick}
      isLoading={isLoading}
      isSaved={isSaved}
      disabled={isLoading}
      buttonText={buttonText}
      removeText={saveArticleButton.remove}
    />
  );
};

export default SaveArticleButtonAuthenticated;
