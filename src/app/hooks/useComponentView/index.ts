import { RefCallback, useEffect, useState } from 'react';

const DEFAULT_VIEW_THRESHOLD = 0.5;

type UseComponentViewOptions = {
  enabled?: boolean;
  threshold?: number;
};

type UseComponentViewResult = {
  isInView: boolean;
  ref: RefCallback<HTMLElement>;
};

const useComponentView = ({
  enabled = true,
  threshold = DEFAULT_VIEW_THRESHOLD,
}: UseComponentViewOptions = {}): UseComponentViewResult => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!enabled || !element || typeof IntersectionObserver === 'undefined') {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        const latestEntry = entries[entries.length - 1];

        setIsInView(
          Boolean(
            latestEntry?.isIntersecting &&
            latestEntry.intersectionRatio >= threshold,
          ),
        );
      },
      { threshold: [threshold] },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      setIsInView(false);
    };
  }, [element, enabled, threshold]);

  return { isInView, ref: setElement };
};

export default useComponentView;
