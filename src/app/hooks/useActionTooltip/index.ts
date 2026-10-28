import { useEffect, useState } from 'react';

interface UseActionTooltipProps<TActionResult> {
  actionResult: TActionResult | null;
  resetActionResult: () => void;
  onClose?: (event?: React.MouseEvent) => void;
}

const useActionTooltip = <TActionResult>({
  actionResult,
  resetActionResult,
  onClose,
}: UseActionTooltipProps<TActionResult>) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    if (actionResult) setIsTooltipVisible(true);
  }, [actionResult]);

  const handleTooltipClose = (event?: React.MouseEvent) => {
    setIsTooltipVisible(false);
    resetActionResult();
    onClose?.(event);
  };

  return { isTooltipVisible, handleTooltipClose };
};

export default useActionTooltip;
