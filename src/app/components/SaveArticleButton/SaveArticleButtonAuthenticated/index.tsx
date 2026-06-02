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
  articlePageData,
}: SaveArticleButtonProps) => {
  const { pathname } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { saveArticleButton } = translations || {};
  const { assetId: articleId } = parseRoute(pathname);

  const { isSaved, isLoading, isUpdating, error, handleSaveAction } =
    useUASButton({
      articleId,
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
    if (isUpdating && isSaved) return saveArticleButton.removing;
    if (isUpdating) return saveArticleButton.saving;
    return buttonLabel;
  };

  const handleClick = (event?: React.MouseEvent) => {
    onClickTrack?.(event);
    handleSaveAction(isSaved ? UASAction.REMOVE : UASAction.SAVE);
  };

  return (
    <div {...viewTracker}>
      <SaveButton
        onClick={handleClick}
        isLoading={isLoading}
        isUpdating={isUpdating}
        isSaved={isSaved}
        disabled={isLoading}
        buttonText={getButtonText()}
        removeText={saveArticleButton.remove}
        testId="save-article-btn-authorized"
      />
    </div>
  );
};

export default SaveArticleButtonAuthenticated;
