import { use } from 'react';
import { useTheme } from '@emotion/react';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#app/contexts/RequestContext';
import parseRoute from '#app/routes/utils/parseRoute';
import useUASButton, { UASAction } from '#app/hooks/useUASButton';
import useTrackErrorEffect from '#app/hooks/useTrackErrorEffect';
import {
  ERROR_TRACKING_FEATURES,
  UAS_ERROR_ACTIONS,
} from '#app/hooks/useErrorTracking/errorTracking.const';
import ErrorBoundary from '#app/components/ErrorBoundary';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import useActionTooltip from '#app/hooks/useActionTooltip';
import SaveButton from '#app/components/SaveButton';
import ActionTooltip from '#app/components/ActionTooltip';
import getActionTooltipContent from '#app/components/ActionTooltip/ActionTooltipContent';
import getActionTooltipStatus from '#app/components/ActionTooltip/getActionTooltipStatus';

import type { SaveArticleButtonProps } from '../index';

const SaveArticleButtonAuthenticatedInner = ({
  saveArticlePageData,
}: SaveArticleButtonProps) => {
  const { pathname } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { saveArticleButton, actionTooltip } = translations || {};
  const { assetId: articleId } = parseRoute(pathname);
  // TODO: remove once the dark-UI tooltip design is ready; suppresses all tooltips on dark-UI pages
  const { isDarkUi } = useTheme();

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

  const {
    isTooltipVisible,
    handleTooltipClose,
    onMyNewsLinkClickTrack,
    tooltipViewTracker,
  } = useActionTooltip({
    actionResult,
    resetActionResult,
    trackingNamePrefix: 'save-article',
    resourceId: articleId,
    isDarkUi,
    getTooltipStatus: result => getActionTooltipStatus(result, UASAction.SAVE),
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
          status={getActionTooltipStatus(actionResult, UASAction.SAVE)}
          content={getActionTooltipContent(actionTooltip, {
            onMyNewsLinkClick: onMyNewsLinkClickTrack,
          })}
          closeLabel={actionTooltip.closeLabel}
          onClose={handleTooltipClose}
          {...tooltipViewTracker}
        />
      )}
    </>
  );
};

const SaveArticleButtonErrorFallback = ({ error }: { error: Error }) => {
  useTrackErrorEffect({
    error,
    feature: ERROR_TRACKING_FEATURES.SAVE_ARTICLE_UAS,
    action: UAS_ERROR_ACTIONS.RENDER,
  });

  return null;
};

const renderSaveArticleButtonErrorFallback = (error: Error) => (
  <SaveArticleButtonErrorFallback error={error} />
);

const SaveArticleButtonAuthenticated = (props: SaveArticleButtonProps) => (
  <ErrorBoundary
    componentName="SaveArticleButtonAuthenticated"
    fallback={renderSaveArticleButtonErrorFallback}
  >
    <SaveArticleButtonAuthenticatedInner {...props} />
  </ErrorBoundary>
);

export default SaveArticleButtonAuthenticated;
