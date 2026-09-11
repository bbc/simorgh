import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within a container, cycling through all focusable
 * elements on Tab/Shift+Tab and restoring focus on unmount.
 *
 * Tab is handled programmatically so links stay reachable in Safari, which
 * otherwise skips them.
 *
 * Returns three refs: `containerRef` (the focus boundary), `firstElementRef`,
 * and `lastElementRef` (optional overrides for the first/last focusable elements).
 */
const useTrappedFocus = <
  C extends HTMLElement = HTMLElement,
  F extends HTMLElement = HTMLElement,
  L extends HTMLElement = HTMLElement,
>() => {
  const containerRef = useRef<C>(null);
  const firstElementRef = useRef<F>(null);
  const lastElementRef = useRef<L>(null);

  useEffect(() => {
    const onDismissFocusElement = document.activeElement as HTMLElement | null;

    const getFocusableElements = (): HTMLElement[] => {
      if (!containerRef.current) return [];
      return Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
    };

    const focusVisibly = (element: HTMLElement | null | undefined) =>
      element?.focus({ focusVisible: true } as FocusOptions);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      event.preventDefault();

      const currentIndex = focusableElements.indexOf(
        document.activeElement as HTMLElement,
      );
      const step = event.shiftKey ? -1 : 1;
      const { length } = focusableElements;
      const nextIndex =
        currentIndex === -1 ? 0 : (currentIndex + step + length) % length;

      focusVisibly(focusableElements[nextIndex]);
    };

    document.addEventListener('keydown', handleKeyDown);
    focusVisibly(firstElementRef.current ?? getFocusableElements()[0]);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      onDismissFocusElement?.focus();
    };
  }, []);

  return { containerRef, firstElementRef, lastElementRef };
};

export default useTrappedFocus;
