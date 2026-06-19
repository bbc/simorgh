import { useEffect, useState } from 'react';

type Props = {
  elementId: string;
  rootMargin?: string;
};

const useNearViewport = ({ elementId, rootMargin }: Props) => {
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return undefined;

    const element = document.getElementById(elementId);

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementId, isNearViewport, rootMargin]);

  return isNearViewport;
};

export default useNearViewport;
