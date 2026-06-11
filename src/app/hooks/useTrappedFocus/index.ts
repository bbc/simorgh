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
    let currentModalFocusRef: Element | null = null;

    const focusListenerWithErrorWrapper = (event: FocusEvent) => {
      try {
        if (!containerRef.current) return;

        const isInModal = containerRef.current.contains(event.target as Node);

        if (isInModal && event.target !== containerRef.current) {
          currentModalFocusRef = event.target as Element;
        } else {
          const wasFirstElementFocused =
            currentModalFocusRef === firstElementRef.current;

          const lastElement: HTMLElement | null =
            lastElementRef.current ??
            Array.from(
              containerRef.current.querySelectorAll<HTMLElement>(
                FOCUSABLE_SELECTOR,
              ),
            ).pop() ??
            null;

          if (wasFirstElementFocused) {
            lastElement?.focus();
          } else {
            firstElementRef.current?.focus();
          }
        }
      } catch {
        return;
      }
    };

    window.addEventListener('focus', focusListenerWithErrorWrapper, true);
    firstElementRef.current?.focus();

    return () => {
      window.removeEventListener('focus', focusListenerWithErrorWrapper, true);
      onDismissFocusElement?.focus();
    };
  }, []);

  return { containerRef, firstElementRef, lastElementRef };
};

export default useTrappedFocus;
