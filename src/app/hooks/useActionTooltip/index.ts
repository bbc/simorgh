import { useEffect, useState } from 'react';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import type { ActionTooltipStatus } from '#app/components/ActionTooltip';

interface UseActionTooltipProps<TActionResult> {
  actionResult: TActionResult | null;
  resetActionResult: () => void;
  trackingNamePrefix: string;
  resourceId?: string;
  isDarkUi: boolean;
  getTooltipStatus: (
    actionResult: NonNullable<TActionResult>,
  ) => ActionTooltipStatus;
}

const useActionTooltip = <TActionResult>({
  actionResult,
  resetActionResult,
  trackingNamePrefix,
  resourceId,
  isDarkUi,
  getTooltipStatus,
}: UseActionTooltipProps<TActionResult>) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (actionResult) setIsTooltipVisible(true);
  }, [actionResult]);

  const tooltipViewTracker = useViewTracker({
    componentName: `${trackingNamePrefix}-tooltip-view-${
      actionResult ? getTooltipStatus(actionResult) : 'none'
    }`,
    viewTrackerKey: actionResult,
  });

  const { onClick: onTooltipCloseClickTrack } = useClickTracker({
    componentName: `${trackingNamePrefix}-tooltip-close`,
    itemTracker: { resourceId },
  });

  const { onClick: onMyNewsLinkClickTrack } = useClickTracker({
    componentName: `${trackingNamePrefix}-tooltip-my-news-link`,
    itemTracker: { resourceId },
  });

  const handleTooltipClose = (event?: React.MouseEvent) => {
    setIsTooltipVisible(false);
    resetActionResult();
    onTooltipCloseClickTrack?.(event);
  };

  return {
    isTooltipVisible: isTooltipVisible && !isDarkUi,
    handleTooltipClose,
    onMyNewsLinkClickTrack,
    tooltipViewTracker,
  };
};

export default useActionTooltip;
