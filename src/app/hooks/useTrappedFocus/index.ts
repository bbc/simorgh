import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

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

    const getFirstFocusable = (): HTMLElement | null =>
      firstElementRef.current ?? getFocusableElements()[0] ?? null;

    const getLastFocusable = (): HTMLElement | null =>
      lastElementRef.current ?? getFocusableElements().pop() ?? null;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      try {
        const firstFocusable = getFirstFocusable();
        const lastFocusable = getLastFocusable();

        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
        } else if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus();
        }
        // eslint-disable-next-line no-empty
      } catch {}
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElementRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      onDismissFocusElement?.focus();
    };
  }, []);

  return { containerRef, firstElementRef, lastElementRef };
};

export default useTrappedFocus;
