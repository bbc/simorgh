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

  const { isSaved, isLoading, isMutating, error, handleSaveAction } =
    useUASButton({
      articleId,
      articleTitle,
      articlePageData,
    });

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

  const getButtonText = () => {
    if (isLoading) return saveArticleButton.loading;
    if (isMutating && isSaved) return saveArticleButton.removing;
    if (isMutating) return saveArticleButton.saving;
    return buttonLabel;
  };

  const handleClick = () => {
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <SaveButton
      onClick={handleClick}
      isLoading={isLoading}
      isMutating={isMutating}
      isSaved={isSaved}
      disabled={isLoading || isMutating}
      buttonText={getButtonText()}
      removeText={saveArticleButton.remove}
      testId="save-article-btn-authorized"
    />
  );
};

export default SaveArticleButtonAuthenticated;
