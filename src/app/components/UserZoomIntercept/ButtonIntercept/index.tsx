import { use, useEffect, useRef, useState, RefObject } from 'react';
import Script from 'next/script';
import { RequestContext } from '#contexts/RequestContext';
import { USERZOOM_SRC } from '../config';

export type UserZoomInterceptProps = {
  targetRef: RefObject<HTMLElement | null>;
};

const UserZoomIntercept = () => {
  const { isAmp, isApp, isLite, nonce } = use(RequestContext);
  const [hasTriggered, setHasTriggered] = useState(false);
  const targetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const target = targetRef?.current;
    if (hasTriggered || !target) {
      return undefined;
    }

    const handleClick = () => setHasTriggered(true);
    target.addEventListener('click', handleClick);
    return () => target.removeEventListener('click', handleClick);
  }, [targetRef, hasTriggered]);

  if (isAmp || isApp || isLite) {
    return null;
  }

  return (
    <>
      {hasTriggered && (
        <Script
          src={USERZOOM_SRC}
          strategy="lazyOnload"
          nonce={nonce ?? undefined}
        />
      )}
      <button type="button" ref={targetRef}>
        Give feedback
      </button>
    </>
  );
};

export default UserZoomIntercept;
