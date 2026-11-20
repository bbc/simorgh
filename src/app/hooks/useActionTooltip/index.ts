import { useEffect, useState } from 'react';
import useClickTracker from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import getActionTooltipStatus, {
  type ActionResult,
} from '#app/components/ActionTooltip/getActionTooltipStatus';

interface UseActionTooltipProps<TActionResult extends ActionResult> {
  actionResult: TActionResult | null;
  resetActionResult: () => void;
  trackingNamePrefix: string;
  resourceId?: string;
}

const useActionTooltip = <TActionResult extends ActionResult>({
  actionResult,
  resetActionResult,
  trackingNamePrefix,
  resourceId,
}: UseActionTooltipProps<TActionResult>) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (actionResult) setIsTooltipVisible(true);
  }, [actionResult]);

  const tooltipViewTracker = useViewTracker({
    componentName: `${trackingNamePrefix}-tooltip-view-${
      actionResult ? getActionTooltipStatus(actionResult) : 'none'
    }`,
    viewTrackerKey: actionResult,
  });

  const { onClick: onTooltipCloseClickTrack } = useClickTracker({
    componentName: `${trackingNamePrefix}-tooltip-close`,
    itemTracker: { resourceId },
    isDismissal: true,
  });

  const { onClick: onMyNewsLinkClickTrack } = useClickTracker({
    componentName: `${trackingNamePrefix}-tooltip-my-news-link`,
    itemTracker: { resourceId },
  });

  const handleTooltipClose = (
    event?: React.MouseEvent | MouseEvent | KeyboardEvent,
  ) => {
    setIsTooltipVisible(false);
    resetActionResult();
    onTooltipCloseClickTrack?.(event);
  };

  return {
    isTooltipVisible,
    handleTooltipClose,
    onMyNewsLinkClickTrack,
    tooltipViewTracker,
  };
};

export default useActionTooltip;
