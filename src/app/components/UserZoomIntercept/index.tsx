import { use, useEffect, useRef, useState, RefObject } from 'react';
import Script from 'next/script';
import { RequestContext } from '#contexts/RequestContext';
import getIntersectionObserver from '#hooks/useViewTracker/getIntersectionObserver';
import styles from './index.module.scss';

const USERZOOM_SRC =
  'https://cdn4.userzoom.com/files/js/QzI4NFQx.js?t=uz_til&cuid=286685F149F6DF1188490022196C4538';

export enum UserZoomTrigger {
  IMMEDIATE = 'immediate',
  VIEW = 'view',
  CLICK = 'click',
}

export type UserZoomInterceptProps = {
  trigger?: UserZoomTrigger;
  targetRef?: RefObject<HTMLElement | null>;
};

const UserZoomIntercept = ({
  trigger = UserZoomTrigger.IMMEDIATE,
  targetRef,
}: UserZoomInterceptProps = {}) => {
  const { isAmp, isApp, isLite, nonce } = use(RequestContext);
  const [hasTriggered, setHasTriggered] = useState(
    trigger === UserZoomTrigger.IMMEDIATE,
  );
  const markerRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (hasTriggered) {
      return undefined;
    }

    if (trigger === UserZoomTrigger.VIEW) {
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

    if (trigger === UserZoomTrigger.CLICK) {
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
  if (!hasTriggered && trigger === UserZoomTrigger.VIEW) {
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
