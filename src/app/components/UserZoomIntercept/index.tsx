import { use, useEffect, useRef, useState, RefObject } from 'react';
import Script from 'next/script';
import { RequestContext } from '#contexts/RequestContext';
import getIntersectionObserver from '#hooks/useViewTracker/getIntersectionObserver';
import styles from './index.module.scss';

// Permanent UserZoom Site Intercept code - spike only, article pages
const USERZOOM_SRC =
  'https://cdn4.userzoom.com/files/js/QzI4NFQx.js?t=uz_til&cuid=286685F149F6DF1188490022196C4538';

export type UserZoomInterceptProps = {
  // 'view': fires when this component scrolls into view (place it at the trigger point).
  // 'click': fires when targetRef is clicked - targetRef must point at an existing visible element.
  // 'immediate': loads as soon as the component mounts.
  trigger?: 'immediate' | 'view' | 'click';
  targetRef?: RefObject<HTMLElement | null>;
};

const UserZoomIntercept = ({
  trigger = 'immediate',
  targetRef,
}: UserZoomInterceptProps = {}) => {
  const { isAmp, isApp, isLite, nonce } = use(RequestContext);
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

    if (trigger === 'click') {
      const target = targetRef?.current;
      if (!target) return undefined;

      const handleClick = () => setHasTriggered(true);
      target.addEventListener('click', handleClick);

      return () => target.removeEventListener('click', handleClick);
    }

    return undefined;
  }, [trigger, targetRef, hasTriggered]);

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

  return (
    <Script
      src={USERZOOM_SRC}
      strategy="lazyOnload"
      nonce={nonce ?? undefined}
    />
  );
};

export default UserZoomIntercept;
