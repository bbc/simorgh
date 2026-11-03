import { use, useEffect, useRef, useState } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import getIntersectionObserver from '#hooks/useViewTracker/getIntersectionObserver';
import styles from './index.module.scss';
import UserZoomScript from '../UserZoomScript';

export type UserZoomViewInterceptProps = {
  // 'view': fires when this component scrolls into view (place it at the trigger point).
  // 'immediate': loads as soon as the component mounts.
  trigger?: 'immediate' | 'view';
};

export default ({ trigger = 'immediate' }: UserZoomViewInterceptProps = {}) => {
  const { isAmp, isApp, isLite } = use(RequestContext);
  const [hasTriggered, setHasTriggered] = useState(trigger === 'immediate');
  const markerRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (hasTriggered) {
      return undefined;
    }

    if (trigger === 'view') {
      const target = markerRef.current;
      if (!target) return undefined;

      getIntersectionObserver({
        threshold: 0,
        componentViewStateSetter: isInView => {
          if (isInView) setHasTriggered(true);
        },
      }).then(createdObserver => {
        observer.current = createdObserver;
        createdObserver.observe(target);
      });

      return () => observer.current?.disconnect();
    }

    return undefined;
  }, [trigger, hasTriggered]);

  if (isAmp || isApp || isLite) {
    return null;
  }

  // Marks the page position that triggers the script once scrolled into view.
  if (!hasTriggered && trigger === 'view') {
    return (
      <span ref={markerRef} aria-hidden="true" className={styles.marker} />
    );
  }

  if (!hasTriggered) {
    return null;
  }

  return <UserZoomScript />;
};
