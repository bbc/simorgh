import { use, useEffect, useState } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import useUASButton, {
  UASAction,
  UASActionResult,
} from '#app/hooks/useUASButton';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import SaveButton from '#app/components/SaveButton';
import ActionTooltip, {
  ActionTooltipStatus,
} from '#app/components/ActionTooltip';
import getArticleTooltipContent from '#app/components/ActionTooltip/ArticleTooltipContent';

import type { SaveArticleButtonProps } from '../index';

const getTooltipStatus = (
  actionResult: NonNullable<UASActionResult>,
): ActionTooltipStatus => {
  if (actionResult.status === 'error') return 'error';
  return actionResult.action === UASAction.SAVE ? 'success' : 'removed';
};

const SaveArticleButtonAuthenticated = ({
  saveArticlePageData,
}: SaveArticleButtonProps) => {
  const { pathname } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { saveArticleButton, actionTooltip } = translations || {};
  const { assetId: articleId } = parseRoute(pathname);

  const {
    isSaved,
    isLoading,
    isUpdating,
    actionResult,
    resetActionResult,
    handleSaveAction,
  } = useUASButton({
    articleId,
    saveArticlePageData,
  });

  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (actionResult) setIsTooltipVisible(true);
  }, [actionResult]);

  const clickComponentName = `save-article-button-click-${
    isSaved ? UASAction.REMOVE : UASAction.SAVE
  }`;

  const viewTracker = useViewTracker({
    componentName: 'save-article-button-view',
  });

  const tooltipViewTracker = useViewTracker({
    componentName: `save-article-tooltip-view-${
      actionResult ? getTooltipStatus(actionResult) : 'none'
    }`,
  });

  const { onClick: onClickTrack } = useClickTracker({
    componentName: clickComponentName,
    itemTracker: {
      resourceId: articleId,
    },
  });

  const { onClick: onTooltipCloseClickTrack } = useClickTracker({
    componentName: 'save-article-tooltip-close',
    itemTracker: {
      resourceId: articleId,
    },
  });

  const { onClick: onMyNewsLinkClickTrack } = useClickTracker({
    componentName: 'save-article-tooltip-my-news-link',
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

  const handleTooltipClose = (event?: React.MouseEvent) => {
    onTooltipCloseClickTrack?.(event);
    setIsTooltipVisible(false);
    resetActionResult();
  };

  return (
    <>
      <SaveButton
        onClick={handleClick}
        isLoading={isLoading}
        isUpdating={isUpdating}
        isSaved={isSaved}
        visualLabel={getVisualLabel()}
        hoverVisualLabel={hoverVisualLabel}
        accessibleLabel={getAccessibleLabel()}
        testId="save-article-btn-authorized"
        {...viewTracker}
      />
      {isTooltipVisible && actionResult && actionTooltip && (
        <ActionTooltip
          status={getTooltipStatus(actionResult)}
          content={getArticleTooltipContent(
            actionTooltip,
            onMyNewsLinkClickTrack,
          )}
          closeLabel={actionTooltip.closeLabel}
          onClose={handleTooltipClose}
          {...tooltipViewTracker}
        />
      )}
    </>
  );
};

export default SaveArticleButtonAuthenticated;
