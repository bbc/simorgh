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

  if (!articlePageData) {
    throw new Error('Article data is required to save');
  }

  const { isSaved, isLoading, isUpdating, handleSaveAction } = useUASButton({
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

  const getVisualLabel = () => {
    if (isLoading) return saveArticleButton.loading;
    if (isUpdating) {
      return isSaved ? saveArticleButton.removing : saveArticleButton.saving;
    }
    if (isSaved) return saveArticleButton.saved;
    return saveArticleButton.save;
  };

  const getAccessibleLabel = () => {
    if (isLoading) return saveArticleButton.loading;
    if (isUpdating) {
      return isSaved ? saveArticleButton.removing : saveArticleButton.saving;
    }
    // When saved, screen readers should hear the action the button performs next.
    if (isSaved) return saveArticleButton.removeAccessible;
    return saveArticleButton.save;
  };

  const hoverVisualLabel =
    isSaved && !isUpdating ? saveArticleButton.remove : undefined;

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
        visualLabel={getVisualLabel()}
        hoverVisualLabel={hoverVisualLabel}
        accessibleLabel={getAccessibleLabel()}
        testId="save-article-btn-authorized"
      />
    </div>
  );
};

export default SaveArticleButtonAuthenticated;
