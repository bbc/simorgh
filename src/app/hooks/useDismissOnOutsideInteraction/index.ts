import { RefObject, useEffect } from 'react';

type UseDismissOnOutsideInteractionOptions = {
  onDismiss: (event?: KeyboardEvent | MouseEvent) => void;
  containerRef?: RefObject<HTMLElement | null>;
  enableOutsideClick?: boolean;
};

/**
 * Calls `onDismiss` when Escape is pressed, or when a click lands outside
 * `containerRef` (if `containerRef` is provided and `enableOutsideClick` is true).
 */
const useDismissOnOutsideInteraction = ({
  onDismiss,
  containerRef,
  enableOutsideClick = true,
}: UseDismissOnOutsideInteractionOptions) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss(event);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
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
