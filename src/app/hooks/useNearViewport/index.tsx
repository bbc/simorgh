import { useEffect, useState } from 'react';

type Props = {
  elementId: string;
  rootMargin?: string;
  bottomViewportMargin?: number;
};

const isWithinBottomViewportMargin = (
  element: Element,
  bottomViewportMargin: number,
) => {
  const { bottom, height, top } = element.getBoundingClientRect();
  const viewportBottom = window.innerHeight * (bottomViewportMargin + 1);

  return height > 0 && top <= viewportBottom && bottom >= 0;
};

const useNearViewport = ({
  elementId,
  rootMargin,
  bottomViewportMargin,
}: Props) => {
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return undefined;

    const initialElement = document.getElementById(elementId);

    if (!initialElement && !bottomViewportMargin) return undefined;

    const resolvedRootMargin = bottomViewportMargin
      ? `0px 0px ${window.innerHeight * bottomViewportMargin}px 0px`
      : rootMargin;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: resolvedRootMargin },
    );

    let observedElement: HTMLElement | null = null;

    const getCurrentTarget = () => {
      const currentElement = document.getElementById(elementId);

      if (!currentElement || currentElement === observedElement) {
        return currentElement;
      }

      if (observedElement) observer.unobserve(observedElement);

      observer.observe(currentElement);
      observedElement = currentElement;

      return currentElement;
    };

    const checkTargetDistance = () => {
      const currentElement = getCurrentTarget();

      if (!currentElement) return;

      const isNearTarget =
        bottomViewportMargin !== undefined &&
        isWithinBottomViewportMargin(currentElement, bottomViewportMargin);

      if (bottomViewportMargin && isNearTarget) {
        setIsNearViewport(true);
      }
    };

    getCurrentTarget();
    checkTargetDistance();

    window.addEventListener('scroll', checkTargetDistance, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkTargetDistance);
      observer.disconnect();
    };
  }, [bottomViewportMargin, elementId, isNearViewport, rootMargin]);

  return isNearViewport;
};

export default useNearViewport;
