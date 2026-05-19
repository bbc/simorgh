import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import SaveButton from '#app/components/SaveButton';

import type { SaveArticleButtonProps } from '../index';

const SaveArticleButtonAuthenticated = ({
  articleTitle,
  articlePageData,
}: SaveArticleButtonProps) => {
  const { pathname } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { saveArticleButton } = translations || {};
  const { assetId: articleId } = parseRoute(pathname);

  const { isSaved, isLoading, error, handleSaveAction } = useUASButton({
    articleId,
    articleTitle,
    articlePageData,
  });

  if (!saveArticleButton) return null;

  if (error) {
    // biome-ignore lint/suspicious/noConsole: we want this
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
      testId="save-article-btn-authorized"
    />
  );
};

export default SaveArticleButtonAuthenticated;
