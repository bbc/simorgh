import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
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

  const clickComponentName = `save-article-button-click-${
    isSaved ? UASAction.REMOVE : UASAction.SAVE
  }`;

  const viewTracker = useViewTracker({
    componentName: 'save-article-button-view',
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: clickComponentName,
    itemTracker: {
      resourceId: articleId,
    },
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

  const handleClick = (event?: React.MouseEvent) => {
    onClickTrack?.(event);
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <SaveButton
      onClick={handleClick}
      isLoading={isLoading}
      isMutating={isMutating}
      isSaved={isSaved}
      buttonText={getButtonText()}
      removeText={saveArticleButton.remove}
      testId="save-article-btn-authorized"
    />
  );
};

export default SaveArticleButtonAuthenticated;
