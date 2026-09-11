import { RefObject, useEffect, useRef } from 'react';

type UseDismissOnOutsideInteractionOptions = {
  onDismiss: (event?: KeyboardEvent | MouseEvent) => void;
  containerRef?: RefObject<HTMLElement | null>;
  enableOutsideClick?: boolean;
  outsideClickGracePeriodMs?: number;
};

const DEFAULT_OUTSIDE_CLICK_GRACE_PERIOD_MS = 500;

/**
 * Calls `onDismiss` on Escape, or on an outside click after `outsideClickGracePeriodMs`
 * has passed (so a click right after mount can't dismiss it immediately).
 */
const useDismissOnOutsideInteraction = ({
  onDismiss,
  containerRef,
  enableOutsideClick = true,
  outsideClickGracePeriodMs = DEFAULT_OUTSIDE_CLICK_GRACE_PERIOD_MS,
}: UseDismissOnOutsideInteractionOptions) => {
  const canDismissOnOutsideClickRef = useRef(false);

  // Runs once on mount so re-renders (e.g. a new onDismiss reference) don't restart the grace period.
  useEffect(() => {
    canDismissOnOutsideClickRef.current = false;
    const armTimer = setTimeout(() => {
      canDismissOnOutsideClickRef.current = true;
    }, outsideClickGracePeriodMs);

    return () => clearTimeout(armTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss(event);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (!canDismissOnOutsideClickRef.current) return;
      if (!containerRef?.current?.contains(event.target as Node)) {
        onDismiss(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    if (enableOutsideClick && containerRef) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (enableOutsideClick && containerRef) {
        document.removeEventListener('click', handleClickOutside, true);
      }
    };
  }, [containerRef, onDismiss, enableOutsideClick]);
};

export default useDismissOnOutsideInteraction;
